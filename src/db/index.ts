import { get, set, del } from 'idb-keyval';

export interface Journey {
  id: string;
  prompt: string;
  exercises: any;
  analysis: any;
  responses: JourneyResponse[];
  timestamp: string;
}

export interface JourneyResponse {
  heading: string;
  response: string;
  audioUrl?: string;
}

const JOURNEY_PREFIX = 'journey_';
const JOURNEY_KEYS = 'journeyKeys';

export const db = {
  async initDatabase() {
    try {
      // Initialize IndexedDB store
      await get(JOURNEY_KEYS);
      return true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      return false;
    }
  },

  async saveJourney(userId: number, prompt: string, exercises: any = null, analysis: any = null): Promise<string> {
    const id = `${Date.now()}`;
    const journey: Journey = {
      id,
      prompt,
      exercises,
      analysis,
      responses: [],
      timestamp: new Date().toISOString()
    };

    try {
      // Save the journey
      await set(`${JOURNEY_PREFIX}${id}`, journey);
      
      // Update journey keys list
      const existingKeys = await get(JOURNEY_KEYS) || [];
      await set(JOURNEY_KEYS, [id, ...existingKeys]);
      
      return id;
    } catch (error) {
      console.error('Failed to save journey:', error);
      throw error;
    }
  },

  async getJourneyHistory(userId: number): Promise<Journey[]> {
    try {
      const journeyKeys = await get(JOURNEY_KEYS) || [];
      const journeys = await Promise.all(
        journeyKeys.map(async (key: string) => {
          const journey = await get(`${JOURNEY_PREFIX}${key}`);
          return journey;
        })
      );
      
      return journeys
        .filter(Boolean)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
      console.error('Failed to get journey history:', error);
      return [];
    }
  },

  async deleteJourney(journeyId: string): Promise<boolean> {
    try {
      // Delete the journey
      await del(`${JOURNEY_PREFIX}${journeyId}`);
      
      // Update journey keys list
      const existingKeys = await get(JOURNEY_KEYS) || [];
      await set(JOURNEY_KEYS, existingKeys.filter(key => key !== journeyId));
      
      return true;
    } catch (error) {
      console.error('Failed to delete journey:', error);
      return false;
    }
  },

  async updateJourneyResponse(
    journeyId: string,
    heading: string,
    response: string,
    audioUrl?: string
  ): Promise<boolean> {
    try {
      const journey: Journey | undefined = await get(`${JOURNEY_PREFIX}${journeyId}`);
      if (!journey) return false;

      const updatedResponses = [...journey.responses];
      const existingIndex = updatedResponses.findIndex(r => r.heading === heading);
      
      if (existingIndex >= 0) {
        updatedResponses[existingIndex] = { heading, response, audioUrl };
      } else {
        updatedResponses.push({ heading, response, audioUrl });
      }

      journey.responses = updatedResponses;
      await set(`${JOURNEY_PREFIX}${journeyId}`, journey);
      return true;
    } catch (error) {
      console.error('Failed to update journey response:', error);
      return false;
    }
  },

  async getJourneyResponses(journeyId: string): Promise<JourneyResponse[]> {
    try {
      const journey: Journey | undefined = await get(`${JOURNEY_PREFIX}${journeyId}`);
      return journey?.responses || [];
    } catch (error) {
      console.error('Failed to get journey responses:', error);
      return [];
    }
  }
};