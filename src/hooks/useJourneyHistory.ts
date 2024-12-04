import { useState, useEffect } from 'react';
import type { JourneyEntry } from '../types/history';
import { getJourneysByUser } from '../db/database';
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
        const history = await getJourneysByUser(user.id);
        if (history) {
          const formattedHistory = history.map((entry: any) => ({
            id: entry.id,
            prompt: entry.prompt,
            exercises: entry.exercises || {},
            analysis: entry.analysis,
            timestamp: entry.createdAt,
            responses: entry.responses || []
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

    // Add event listener for storage changes
    const handleStorageChange = () => {
      loadHistory();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('journeyUpdate', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('journeyUpdate', handleStorageChange);
    };
  }, [user]);

  return {
    journeyHistory,
    setJourneyHistory,
    isLoading
  };
}