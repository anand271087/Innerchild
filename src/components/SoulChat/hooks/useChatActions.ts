import { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { getChatResponse, getInnerChildAnalysis } from '../../../services/openai';
import { createJourney, saveAnalysis, saveExercises } from '../../../services/supabase';
import type { JourneyEntry } from '../../../types/history';

export function useChatActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const handleSubmit = async (inputText: string): Promise<JourneyEntry | null> => {
    if (!user) {
      setError('Please sign in to continue');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [exercisesResponse, analysisResponse] = await Promise.all([
        getChatResponse(inputText, []),
        getInnerChildAnalysis(inputText)
      ]);

      // Save to Supabase
      const journey = await createJourney(user.id, inputText);

      await Promise.all([
        saveAnalysis(journey.id, analysisResponse),
        saveExercises(journey.id, exercisesResponse)
      ]);

      window.dispatchEvent(new Event('journeyUpdate'));

      // Return the journey entry
      return {
        id: journey.id,
        prompt: inputText,
        exercises: exercisesResponse,
        analysis: analysisResponse.triggers,
        timestamp: new Date().toISOString()
      };
      
    } catch (error: any) {
      console.error('Failed to get response:', error);
      setError(error.message || 'Failed to analyze. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
    error
  };
}