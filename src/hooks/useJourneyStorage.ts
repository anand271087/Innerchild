import { useState } from 'react';
import { saveJourney, updateJourneyResponse, SaveJourneyResponse } from '../services/journeyService';

export function useJourneyStorage(userId: number) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveNewJourney = async (prompt: string, responses: SaveJourneyResponse[]) => {
    setIsSaving(true);
    setError(null);
    try {
      const journey = await saveJourney(userId, prompt, responses);
      return journey;
    } catch (err) {
      setError('Failed to save journey');
      console.error('Journey save error:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const updateResponse = async (journeyId: number, heading: string, response: string, audioUrl?: string) => {
    setIsSaving(true);
    setError(null);
    try {
      const updatedResponse = await updateJourneyResponse(journeyId, heading, response, audioUrl);
      return updatedResponse;
    } catch (err) {
      setError('Failed to update response');
      console.error('Response update error:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    error,
    saveNewJourney,
    updateResponse
  };
}