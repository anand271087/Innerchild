import { getStore, setStore, STORE_KEYS, type JourneyEntry, type JourneyResponse } from './database';

export async function saveJourney(
  userId: number,
  prompt: string,
  exercises: any = null,
  analysis: any = null
) {
  try {
    const journeys = await getStore<JourneyEntry>(STORE_KEYS.JOURNEYS);
    const now = new Date().toISOString();
    
    const newJourney: JourneyEntry = {
      id: crypto.randomUUID(),
      prompt,
      exercises,
      analysis,
      userId,
      responses: [],
      createdAt: now
    };

    journeys.unshift(newJourney);
    await setStore(STORE_KEYS.JOURNEYS, journeys);
    return newJourney.id;
  } catch (error) {
    console.error('Failed to save journey:', error);
    throw error;
  }
}

export async function getJourneyHistory(userId: number) {
  try {
    const journeys = await getStore<JourneyEntry>(STORE_KEYS.JOURNEYS);
    return journeys
      .filter(j => j.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Failed to get journey history:', error);
    return [];
  }
}

export async function deleteJourney(journeyId: string) {
  try {
    const journeys = await getStore<JourneyEntry>(STORE_KEYS.JOURNEYS);
    const responses = await getStore<JourneyResponse>(STORE_KEYS.JOURNEY_RESPONSES);
    
    await setStore(
      STORE_KEYS.JOURNEYS,
      journeys.filter(j => j.id !== journeyId)
    );
    
    await setStore(
      STORE_KEYS.JOURNEY_RESPONSES,
      responses.filter(r => r.journeyId !== journeyId)
    );
    
    return true;
  } catch (error) {
    console.error('Failed to delete journey:', error);
    throw error;
  }
}

export async function updateJourneyResponse(
  journeyId: string,
  heading: string,
  response: string,
  audioUrl?: string
) {
  try {
    const responses = await getStore<JourneyResponse>(STORE_KEYS.JOURNEY_RESPONSES);
    const now = new Date().toISOString();
    
    const existingIndex = responses.findIndex(
      r => r.journeyId === journeyId && r.heading === heading
    );

    if (existingIndex >= 0) {
      responses[existingIndex] = {
        ...responses[existingIndex],
        response,
        audioUrl,
        createdAt: now
      };
    } else {
      responses.push({
        id: crypto.randomUUID(),
        journeyId,
        heading,
        response,
        audioUrl,
        createdAt: now
      });
    }

    await setStore(STORE_KEYS.JOURNEY_RESPONSES, responses);
    return true;
  } catch (error) {
    console.error('Failed to update journey response:', error);
    throw error;
  }
}