import sql from './db';

export interface SurveyResponse {
  id?: number;
  timestamp: string;
  answers: Record<string, string>;
}

export async function saveResponse(answers: Record<string, string>): Promise<boolean> {
  try {
    await sql`
      INSERT INTO survey_responses (timestamp, answers)
      VALUES (NOW(), ${JSON.stringify(answers)})
    `;
    return true;
  } catch (error) {
    console.error('Save response error:', error);
    return false;
  }
}

export async function getAllResponses(): Promise<SurveyResponse[]> {
  try {
    const results = await sql`
      SELECT id, timestamp, answers FROM survey_responses
      ORDER BY timestamp DESC
    `;

    return results.map(row => ({
      id: row.id as number,
      timestamp: (row.timestamp as Date).toISOString(),
      answers: typeof row.answers === 'string' ? JSON.parse(row.answers) : row.answers
    }));
  } catch (error) {
    console.error('Get responses error:', error);
    return [];
  }
}

export async function deleteAllResponses(): Promise<boolean> {
  try {
    await sql`DELETE FROM survey_responses`;
    return true;
  } catch (error) {
    console.error('Delete responses error:', error);
    return false;
  }
}
