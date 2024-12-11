import { useState, useEffect } from 'react';
import { saveJournal, getJournal } from '../db/journals';

interface UseJournalProps {
  userId: number;
  dayNumber: number;
}

export function useJournal({ userId, dayNumber }: UseJournalProps) {
  const [journalEntry, setJournalEntry] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJournal = async () => {
      try {
        const journal = await getJournal(userId, dayNumber);
        if (journal) {
          setJournalEntry(journal.content);
        }
      } catch (err) {
        console.error('Failed to load journal:', err);
        setError('Failed to load journal entry');
      }
    };

    loadJournal();
  }, [userId, dayNumber]);

  const saveJournalEntry = async (content: string) => {
    setIsSaving(true);
    setError(null);
    try {
      await saveJournal(userId, content, dayNumber);
      setJournalEntry(content);
      window.dispatchEvent(new Event('journeyProgressUpdate'));
    } catch (err) {
      console.error('Failed to save journal:', err);
      setError('Failed to save journal entry');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    journalEntry,
    setJournalEntry,
    saveJournalEntry,
    isSaving,
    error,
  };
}