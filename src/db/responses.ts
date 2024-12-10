import { initDatabase } from './config';

export async function updateJourneyResponse(
  journeyId: number,
  heading: string,
  response: string,
  audioUrl?: string
) {
  const db = await initDatabase();
  try {
    const stmt = db.prepare(`
      INSERT INTO journey_responses (journey_id, heading, response, audio_url)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(journey_id, heading) 
      DO UPDATE SET response = ?, audio_url = ?
    `);
    stmt.run([journeyId, heading, response, audioUrl, response, audioUrl]);
    return true;
  } catch (error) {
    console.error('Failed to update journey response:', error);
    throw error;
  }
}

export async function getJourneyResponses(journeyId: number) {
  const db = await initDatabase();
  try {
    const stmt = db.prepare(`
      SELECT heading, response, audio_url
      FROM journey_responses
      WHERE journey_id = ?
    `);
    return stmt.all([journeyId]);
  } catch (error) {
    console.error('Failed to get journey responses:', error);
    return [];
  }
}