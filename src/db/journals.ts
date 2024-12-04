import { getStore, setStore, STORE_KEYS } from './database';
import type { JournalEntry } from '../types/journal';

export async function saveJournal(userId: number, content: string, dayNumber: number) {
  try {
    const journals = await getStore<JournalEntry>(STORE_KEYS.JOURNALS);
    const now = new Date().toISOString();
    
    const existingIndex = journals.findIndex(
      j => j.userId === userId && j.dayNumber === dayNumber
    );

    if (existingIndex >= 0) {
      journals[existingIndex] = {
        ...journals[existingIndex],
        content,
        updatedAt: now
      };
    } else {
      journals.push({
        id: crypto.randomUUID(),
        content,
        dayNumber,
        userId,
        createdAt: now,
        updatedAt: now
      });
    }

    await setStore(STORE_KEYS.JOURNALS, journals);
    return journals[existingIndex >= 0 ? existingIndex : journals.length - 1];
  } catch (error) {
    console.error('Failed to save journal:', error);
    throw error;
  }
}

export async function getJournal(userId: number, dayNumber: number) {
  try {
    const journals = await getStore<JournalEntry>(STORE_KEYS.JOURNALS);
    return journals.find(j => j.userId === userId && j.dayNumber === dayNumber) || null;
  } catch (error) {
    console.error('Failed to get journal:', error);
    return null;
  }
}

export async function getAllJournals(userId: number) {
  try {
    const journals = await getStore<JournalEntry>(STORE_KEYS.JOURNALS);
    return journals
      .filter(j => j.userId === userId)
      .sort((a, b) => a.dayNumber - b.dayNumber);
  } catch (error) {
    console.error('Failed to get all journals:', error);
    return [];
  }
}