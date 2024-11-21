// Previous imports remain the same...

export function useJournal({ userId, dayNumber }: UseJournalProps) {
  // Previous state declarations remain the same...

  const saveJournalEntry = async (content: string) => {
    setIsSaving(true);
    try {
      localStorage.setItem(`journal-${userId}-${dayNumber}`, content);
      setJournalEntry(content);
      // Dispatch custom event to update progress
      window.dispatchEvent(new Event('journeyProgressUpdate'));
    } catch (err) {
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