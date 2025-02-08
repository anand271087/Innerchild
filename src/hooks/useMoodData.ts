import { useState, useEffect } from 'react';

interface MoodEntry {
  date: string;
  mood: string;
  notes: string;
  triggers?: string[];
}

export function useMoodData(patientId?: string) {
  const [moodData, setMoodData] = useState<MoodEntry[]>([
    {
      date: '2024-03-01',
      mood: 'Happy',
      notes: 'Great progress in therapy session today',
      triggers: ['Positive Interaction', 'Achievement']
    },
    {
      date: '2024-03-02',
      mood: 'Content',
      notes: 'Peaceful day, practiced meditation',
      triggers: ['Self-care', 'Mindfulness']
    },
    // Add more sample data as needed
  ]);

  // In a real application, you would fetch this data from your backend
  useEffect(() => {
    // Fetch mood data for the patient
    // setMoodData(fetchedData);
  }, [patientId]);

  return { moodData };
}