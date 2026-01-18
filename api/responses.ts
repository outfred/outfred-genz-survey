// Auto-detect API URL based on environment
const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'
  : `${window.location.protocol}//${window.location.hostname}:3001`;

export interface SurveyResponse {
  id?: number;
  name?: string;
  phone?: string;
  timestamp: string;
  answers: Record<string, string>;
}

export async function saveResponse(
  answers: Record<string, string>,
  name?: string,
  phone?: string
): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, answers }),
    });

    if (!response.ok) {
      throw new Error('Failed to save response');
    }

    return true;
  } catch (error) {
    console.error('Save response error:', error);
    // Fallback to localStorage if server is unavailable
    try {
      const responseData = {
        timestamp: new Date().toISOString(),
        name,
        phone,
        answers
      };
      const existing = JSON.parse(localStorage.getItem('outfred_survey_responses') || '[]');
      existing.push(responseData);
      localStorage.setItem('outfred_survey_responses', JSON.stringify(existing));
      console.log('Response saved to localStorage as fallback');
      return true;
    } catch (localError) {
      console.error('LocalStorage fallback error:', localError);
      return false;
    }
  }
}

export async function getAllResponses(): Promise<SurveyResponse[]> {
  try {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${API_URL}/api/responses`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch responses');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get responses error:', error);
    // Fallback to localStorage
    try {
      const stored = localStorage.getItem('outfred_survey_responses');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}

export async function deleteAllResponses(): Promise<boolean> {
  try {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${API_URL}/api/responses`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete responses');
    }

    return true;
  } catch (error) {
    console.error('Delete responses error:', error);
    // Fallback to localStorage
    try {
      localStorage.removeItem('outfred_survey_responses');
      return true;
    } catch {
      return false;
    }
  }
}
