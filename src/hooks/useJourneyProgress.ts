import { useState, useEffect } from 'react';

interface DayProgress {
  hasJournal: boolean;
  hasVoiceJournal: boolean;
  hasReflection: boolean;
}

export function useJourneyProgress(userId: number) {
  const [progress, setProgress] = useState<Record<number, DayProgress>>({});

  useEffect(() => {
    const checkProgress = () => {
      const dayProgress: Record<number, DayProgress> = {};
      
      // Check progress for all 42 days
      for (let day = 1; day <= 42; day++) {
        const journalEntry = localStorage.getItem(`journal-${userId}-${day}`);
        const voiceJournal = localStorage.getItem(`voice-journal-${userId}-${day}`);
        const reflection = localStorage.getItem(`reflection-${userId}-${day}`);
        
        dayProgress[day] = {
          hasJournal: !!journalEntry,
          hasVoiceJournal: !!voiceJournal,
          hasReflection: !!reflection
        };
      }
      
      setProgress(dayProgress);
    };

    // Initial check
    checkProgress();

    // Listen for both storage events and custom progress updates
    const handleStorageChange = () => {
      checkProgress();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('journeyProgressUpdate', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('journeyProgressUpdate', handleStorageChange);
    };
  }, [userId]);

  return progress;
}