import { useState, useEffect } from 'react';
import { db } from '../db';

interface UseJourneyResponsesProps {
  userId: number;
  journeyId?: number;
}

export function useJourneyResponses({ userId, journeyId }: UseJourneyResponsesProps) {
  const [responses, setResponses] = useState<Record<string, { text: string; audioUrl: string | null }>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved responses from database
    const loadResponses = async () => {
      if (!journeyId) return;
      
      try {
        const savedResponses = await db.getJourneyHistory(userId);
        const journey = savedResponses.find(j => j.id === journeyId);
        
        if (journey?.responses) {
          const responseMap = journey.responses.reduce((acc, response) => ({
            ...acc,
            [response.heading]: {
              text: response.response,
              audioUrl: response.audio_url
            }
          }), {});
          
          setResponses(responseMap);
        }
      } catch (error) {
        console.error('Failed to load responses:', error);
      }
    };

    loadResponses();
  }, [userId, journeyId]);

  const saveResponse = async (heading: string, text: string, audioUrl: string | null = null) => {
    setIsSaving(true);
    try {
      if (journeyId) {
        await db.updateJourneyResponse(journeyId, heading, text, audioUrl);
      }
      
      setResponses(prev => ({
        ...prev,
        [heading]: { text, audioUrl }
      }));
    } catch (error) {
      console.error('Failed to save response:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    responses,
    saveResponse,
    isSaving
  };
}