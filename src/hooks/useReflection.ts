import { useState, useEffect } from 'react';
import { saveReflection, getReflection } from '../db/reflections';

interface UseReflectionProps {
  userId: number;
  dayNumber: number;
}

export function useReflection({ userId, dayNumber }: UseReflectionProps) {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isReflectionSaved, setIsReflectionSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReflection = async () => {
      try {
        const reflection = await getReflection(userId, dayNumber);
        if (reflection) {
          setSelectedMoods(reflection.mood.split(','));
          setNotes(reflection.notes || '');
        }
      } catch (err) {
        console.error('Failed to load reflection:', err);
        setError('Failed to load reflection');
      }
    };

    loadReflection();
  }, [userId, dayNumber]);

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood)
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
  };

  const saveReflectionEntry = async () => {
    try {
      await saveReflection(
        userId,
        dayNumber,
        selectedMoods.join(','),
        notes
      );
      
      setIsReflectionSaved(true);
      window.dispatchEvent(new Event('journeyProgressUpdate'));
      setTimeout(() => setIsReflectionSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save reflection:', err);
      setError('Failed to save reflection');
    }
  };

  return {
    selectedMoods,
    notes,
    setNotes,
    toggleMood,
    saveReflection: saveReflectionEntry,
    isReflectionSaved,
    error
  };
}