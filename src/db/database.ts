import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { STORE_KEYS, type StoreKey } from './constants';

interface InnerHealDBSchema extends DBSchema {
  users: {
    key: number;
    value: {
      id: number;
      email: string;
      name?: string;
      password: string;
    };
    indexes: { 'by-email': string };
  };
  journals: {
    key: string;
    value: {
      id: string;
      content: string;
      dayNumber: number;
      userId: number;
      createdAt: string;
      updatedAt: string;
    };
    indexes: { 'by-user': number };
  };
  journeys: {
    key: string;
    value: {
      id: string;
      prompt: string;
      exercises: any;
      analysis: any;
      userId: number;
      responses: Array<{
        heading: string;
        response: string;
        audioUrl?: string;
      }>;
      createdAt: string;
    };
    indexes: { 'by-user': number };
  };
}

let db: IDBPDatabase<InnerHealDBSchema>;

export async function initDatabase() {
  if (db) return db;

  db = await openDB<InnerHealDBSchema>('inner-heal-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_KEYS.USERS)) {
        const userStore = db.createObjectStore(STORE_KEYS.USERS, { 
          keyPath: 'id',
          autoIncrement: true 
        });
        userStore.createIndex('by-email', 'email', { unique: true });
      }

      if (!db.objectStoreNames.contains(STORE_KEYS.JOURNALS)) {
        const journalStore = db.createObjectStore(STORE_KEYS.JOURNALS, { 
          keyPath: 'id' 
        });
        journalStore.createIndex('by-user', 'userId');
      }

      if (!db.objectStoreNames.contains(STORE_KEYS.JOURNEYS)) {
        const journeyStore = db.createObjectStore(STORE_KEYS.JOURNEYS, { 
          keyPath: 'id' 
        });
        journeyStore.createIndex('by-user', 'userId');
      }
    },
  });

  return db;
}

export async function getStore<T>(storeName: StoreKey) {
  const db = await initDatabase();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const items = await store.getAll();
  await tx.done;
  return items as T[];
}

export async function setStore<T>(storeName: StoreKey, items: T[]) {
  const db = await initDatabase();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.clear();
  for (const item of items) {
    await store.add(item);
  }
  await tx.done;
}

export async function addUser(email: string, password: string, name?: string) {
  const db = await initDatabase();
  const tx = db.transaction(STORE_KEYS.USERS, 'readwrite');
  const store = tx.objectStore(STORE_KEYS.USERS);
  
  const user = {
    email,
    password,
    name
  };
  
  const id = await store.add(user);
  await tx.done;
  
  return { id, email, name };
}

export async function getUserByEmail(email: string) {
  const db = await initDatabase();
  const tx = db.transaction(STORE_KEYS.USERS, 'readonly');
  const store = tx.objectStore(STORE_KEYS.USERS);
  const index = store.index('by-email');
  
  const user = await index.get(email);
  await tx.done;
  
  return user;
}

export async function saveJourney(userId: number, prompt: string, exercises: any, analysis: any) {
  const db = await initDatabase();
  const tx = db.transaction(STORE_KEYS.JOURNEYS, 'readwrite');
  const store = tx.objectStore(STORE_KEYS.JOURNEYS);
  
  const journey = {
    id: crypto.randomUUID(),
    userId,
    prompt,
    exercises,
    analysis,
    responses: [],
    createdAt: new Date().toISOString()
  };
  
  await store.add(journey);
  await tx.done;
  
  return journey.id;
}

export async function getJourneysByUser(userId: number) {
  const db = await initDatabase();
  const tx = db.transaction(STORE_KEYS.JOURNEYS, 'readonly');
  const store = tx.objectStore(STORE_KEYS.JOURNEYS);
  const index = store.index('by-user');
  
  const journeys = await index.getAll(userId);
  await tx.done;
  
  return journeys;
}

export { STORE_KEYS };