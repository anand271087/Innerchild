import { getStore, setStore, STORE_KEYS, type ReflectionEntry } from './database';

export async function saveReflection(
  userId: number,
  dayNumber: number,
  mood: string,
  notes: string | null = null
) {
  try {
    const reflections = await getStore<ReflectionEntry>(STORE_KEYS.REFLECTIONS);
    const now = new Date().toISOString();
    
    const existingIndex = reflections.findIndex(
      r => r.userId === userId && r.dayNumber === dayNumber
    );

    if (existingIndex >= 0) {
      reflections[existingIndex] = {
        ...reflections[existingIndex],
        mood,
        notes,
        updatedAt: now
      };
    } else {
      reflections.push({
        id: crypto.randomUUID(),
        mood,
        notes,
        dayNumber,
        userId,
        createdAt: now,
        updatedAt: now
      });
    }

    await setStore(STORE_KEYS.REFLECTIONS, reflections);
    return reflections[existingIndex >= 0 ? existingIndex : reflections.length - 1];
  } catch (error) {
    console.error('Failed to save reflection:', error);
    throw error;
  }
}

export async function getReflection(userId: number, dayNumber: number) {
  try {
    const reflections = await getStore<ReflectionEntry>(STORE_KEYS.REFLECTIONS);
    return reflections.find(r => r.userId === userId && r.dayNumber === dayNumber) || null;
  } catch (error) {
    console.error('Failed to get reflection:', error);
    return null;
  }
}

export async function getAllReflections(userId: number) {
  try {
    const reflections = await getStore<ReflectionEntry>(STORE_KEYS.REFLECTIONS);
    return reflections
      .filter(r => r.userId === userId)
      .sort((a, b) => a.dayNumber - b.dayNumber);
  } catch (error) {
    console.error('Failed to get all reflections:', error);
    return [];
  }
}