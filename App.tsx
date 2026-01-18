import React, { useState, useEffect } from 'react';
import { SURVEY_CONTENT } from './constants';
import { Language } from './types';
import LanguageToggle from './components/LanguageToggle';
import QuestionCard from './components/QuestionCard';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Update HTML dir based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Check if admin is already logged in
    const token = localStorage.getItem('admin_token');
    if (token) {
      verifyAdminToken(token);
    }
  }, [language]);

  const verifyAdminToken = async (token: string) => {
    try {
      const { verifyToken } = await import('./api/auth');
      const isValid = await verifyToken(token);
      setIsAuthenticated(isValid);
      if (!isValid) {
        localStorage.removeItem('admin_token');
      }
    } catch (err) {
      console.error('Token verification failed:', err);
      setIsAuthenticated(false);
      localStorage.removeItem('admin_token');
    }
  };

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const calculateProgress = () => {
    const totalQuestions = SURVEY_CONTENT.sections.reduce(
      (acc, section) => acc + section.questions.length,
      0
    );
    const answeredCount = Object.keys(answers).length;
    return Math.round((answeredCount / totalQuestions) * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to database
    try {
      const { saveResponse } = await import('./api/responses');
      const success = await saveResponse(answers);
      
      if (!success) {
        console.error('Failed to save response to database');
        // Fallback to localStorage
        const responseData = {
          timestamp: new Date().toISOString(),
          answers: answers
        };
        try {
          const existing = JSON.parse(localStorage.getItem('outfred_survey_responses') || '[]');
          existing.push(responseData);
          localStorage.setItem('outfred_survey_responses', JSON.stringify(existing));
        } catch (error) {
          console.error("Failed to save response locally", error);
        }
      }
    } catch (error) {
      console.error("Failed to save response", error);
    }

    // Simulate submission loading
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  if (!mounted) return null;

  if (showLogin && !isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(token) => {
          setIsAuthenticated(true);
          setShowLogin(false);
          setShowAdmin(true);
        }}
        onCancel={() => setShowLogin(false)}
      />
    );
  }

  if (showAdmin && isAuthenticated) {
    return (
      <AdminPanel
        onClose={() => setShowAdmin(false)}
        onLogout={() => {
          setIsAuthenticated(false);
          setShowAdmin(false);
        }}
      />
    );
  }

  const isAr = language === 'ar';

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply filter opacity-70 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 glass-panel max-w-lg w-full p-10 rounded-2xl text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className={`text-3xl font-bold text-foreground ${isAr ? 'font-arabic' : 'font-sans'}`}>
            {isAr ? SURVEY_CONTENT.outro.titleAr : SURVEY_CONTENT.outro.titleFr}
          </h2>
          <p className={`text-lg text-muted-foreground leading-relaxed ${isAr ? 'font-arabic' : 'font-sans'}`}>
            {isAr ? SURVEY_CONTENT.outro.bodyAr : SURVEY_CONTENT.outro.bodyFr}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            {isAr ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();
  const totalQuestions = SURVEY_CONTENT.sections.reduce((acc, s) => acc + s.questions.length, 0);
  const isComplete = Object.keys(answers).length === totalQuestions;

  return (
    <div className={`min-h-screen bg-background relative selection:bg-primary/30 selection:text-foreground pb-20`}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-4 pt-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-6 mb-10">
          <img 
            src="https://www.outfred.fit/logo.webp?v=default" 
            alt="Outfred Logo" 
            className="h-12 object-contain dark:invert filter" 
          />
          <LanguageToggle mode={language} setMode={setLanguage} />
        </div>

        {/* Intro Card */}
        <div className="glass-panel rounded-2xl p-8 mb-10 text-center border-t-4 border-t-primary shadow-lg">
          <h1 className={`text-3xl font-bold mb-4 text-primary bg-clip-text ${isAr ? 'font-arabic' : 'font-sans'}`}>
            {isAr ? SURVEY_CONTENT.intro.titleAr : SURVEY_CONTENT.intro.titleFr}
          </h1>
          <p className={`text-lg text-muted-foreground leading-8 ${isAr ? 'font-arabic' : 'font-sans'}`}>
            {isAr ? SURVEY_CONTENT.intro.bodyAr : SURVEY_CONTENT.intro.bodyFr}
          </p>
        </div>

        {/* Survey Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {SURVEY_CONTENT.sections.map((section, index) => (
            <div key={section.id} className="animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {index + 1}
                </span>
                <h2 className={`text-2xl font-bold text-foreground ${isAr ? 'font-arabic' : 'font-sans'}`}>
                  {isAr ? section.titleAr : section.titleFr}
                </h2>
              </div>
              
              <div className="space-y-6">
                {section.questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    language={language}
                    selectedOption={answers[question.id] || null}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Submit Action */}
          <div className="sticky bottom-4 z-50">
             <div className="glass-panel p-4 rounded-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl bg-background/80 border-primary/20">
                <div className="w-full md:w-1/2">
                   <div className="flex justify-between text-xs mb-2 px-1">
                      <span className="text-muted-foreground font-semibold">
                        {isAr ? 'التقدم' : 'Progress'}
                      </span>
                      <span className="text-primary font-bold">{progress}%</span>
                   </div>
                   <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                   </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!isComplete}
                  className={`
                    w-full md:w-auto px-8 py-3 rounded-lg font-bold shadow-lg transition-all duration-300 transform
                    ${isComplete 
                      ? 'bg-primary text-primary-foreground hover:translate-y-[-2px] hover:shadow-primary/30' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed opacity-70'}
                    ${isAr ? 'font-arabic' : 'font-sans'}
                  `}
                >
                  {isAr ? 'يالا بينا! 🚀' : 'Yalla Bina! 🚀'}
                </button>
             </div>
          </div>
        </form>
      </main>
      
      <footer className="mt-20 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Outfred. All rights reserved.</p>
        <button 
          onClick={() => {
            if (isAuthenticated) {
              setShowAdmin(true);
            } else {
              setShowLogin(true);
            }
          }} 
          className="mt-4 text-xs opacity-30 hover:opacity-100 transition-opacity"
        >
          {isAuthenticated ? 'Admin Panel' : 'Admin Login'}
        </button>
      </footer>
    </div>
  );
};

export default App;