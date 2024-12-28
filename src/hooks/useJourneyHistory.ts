import { useState, useEffect } from 'react';
import type { JourneyEntry } from '../types/history';
import { getJourneyHistory } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export function useJourneyHistory() {
  const [journeyHistory, setJourneyHistory] = useState<JourneyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) {
        setJourneyHistory([]);
        setIsLoading(false);
        return;
      }

      try {
        const history = await getJourneyHistory(user.id);
        if (history) {
          const formattedHistory = history.map((entry: any) => ({
            id: entry.id,
            prompt: entry.prompt,
            exercises: entry.exercises?.reduce((acc: any, ex: any) => ({
              ...acc,
              [ex.exercise_type]: {
                title: ex.title,
                goal: ex.goal,
                steps: ex.steps
              }
            }), {}) || {},
            analysis: entry.analyses?.[0]?.triggers || [],
            timestamp: entry.created_at,
            responses: entry.journey_responses?.map((resp: any) => ({
              heading: resp.heading,
              response: resp.response,
              audioUrl: resp.audio_url
            })) || []
          }));
          setJourneyHistory(formattedHistory);
        }
      } catch (error) {
        console.error('Failed to load journey history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();

    const handleJourneyUpdate = () => {
      loadHistory();
    };

    window.addEventListener('journeyUpdate', handleJourneyUpdate);
    
    return () => {
      window.removeEventListener('journeyUpdate', handleJourneyUpdate);
    };
  }, [user]);

  return {
    journeyHistory,
    setJourneyHistory,
    isLoading
  };
}