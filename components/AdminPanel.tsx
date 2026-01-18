import React, { useState, useEffect } from 'react';
import { SURVEY_CONTENT } from '../constants';

interface AdminPanelProps {
  onClose: () => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onLogout }) => {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    try {
      setLoading(true);
      // Import dynamically to avoid issues
      const { getAllResponses } = await import('../api/responses');
      const data = await getAllResponses();
      setResponses(data.reverse()); // Newest first
    } catch (err) {
      console.error('Failed to load responses:', err);
      setError('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (responses.length === 0) return;

    // Create CSV Header
    // Flatten all questions to get headers
    const questionHeaders = SURVEY_CONTENT.sections.flatMap(section =>
      section.questions.map(q => q.id)
    );
    const headers = ['Timestamp', ...questionHeaders];

    // Map data to rows
    const csvContent = [
      headers.join(','),
      ...responses.map(resp => {
        const row = [
          `"${new Date(resp.timestamp).toLocaleString()}"`,
          ...questionHeaders.map(qid => `"${resp.answers[qid] || ''}"`)
        ];
        return row.join(',');
      })
    ].join('\n');

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `outfred_responses_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearData = async () => {
    if (confirm("Are you sure you want to delete all data? This cannot be undone.")) {
      try {
        const { deleteAllResponses } = await import('../api/responses');
        await deleteAllResponses();
        setResponses([]);
      } catch (err) {
        console.error('Failed to clear data:', err);
        alert('فشل حذف البيانات');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
  };

  // Helper to find question text and translate answer
  const getQuestionText = (qid: string) => {
    for (const section of SURVEY_CONTENT.sections) {
      const q = section.questions.find(q => q.id === qid);
      if (q) return q.questionAr; // Arabic for headers
    }
    return qid;
  };

  const getAnswerText = (qid: string, answerId: string) => {
    for (const section of SURVEY_CONTENT.sections) {
      const q = section.questions.find(q => q.id === qid);
      if (q && q.options) {
        const option = q.options.find(opt => opt.id === answerId);
        if (option) return option.labelAr; // Arabic answer
      }
    }
    return answerId; // fallback to ID if not found
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div>
          <h1 className="text-xl font-bold font-sans">Outfred Admin Panel</h1>
          <p className="text-sm text-muted-foreground">{responses.length} استبيان تم جمعها</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={clearData}
            className="px-4 py-2 bg-destructive text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Clear Data
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">جاري التحميل...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-red-600">
              <p>{error}</p>
              <button onClick={loadResponses} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
                إعادة المحاولة
              </button>
            </div>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-auto">
            <table className="w-full text-sm text-right" dir="rtl">
              <thead className="bg-secondary/50 text-foreground font-medium sticky top-0 z-10">
                <tr>
                  <th className="p-3 border-b border-border whitespace-nowrap bg-card">الوقت</th>
                  <th className="p-3 border-b border-border whitespace-nowrap bg-card">الاسم</th>
                  <th className="p-3 border-b border-border whitespace-nowrap bg-card">رقم الهاتف</th>
                  {SURVEY_CONTENT.sections.flatMap(s => s.questions).map(q => (
                    <th key={q.id} className="p-3 border-b border-border min-w-[150px] whitespace-nowrap bg-card" title={q.questionFr}>
                      {q.questionAr.length > 30 ? q.questionAr.substring(0, 30) + '...' : q.questionAr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responses.length === 0 ? (
                  <tr>
                    <td colSpan={100} className="p-8 text-center text-muted-foreground">
                      لا توجد استبيانات حتى الآن
                    </td>
                  </tr>
                ) : (
                  responses.map((resp, idx) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors border-b border-border/50">
                      <td className="p-3 whitespace-nowrap text-muted-foreground">
                        {new Date(resp.timestamp).toLocaleString('ar-EG')}
                      </td>
                      <td className="p-3 whitespace-nowrap font-medium">
                        {resp.name || '-'}
                      </td>
                      <td className="p-3 whitespace-nowrap font-medium" dir="ltr">
                        {resp.phone || '-'}
                      </td>
                      {SURVEY_CONTENT.sections.flatMap(s => s.questions).map(q => (
                        <td key={q.id} className="p-3 whitespace-nowrap font-medium">
                          {getAnswerText(q.id, resp.answers[q.id]) || '-'}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;