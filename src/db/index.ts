import Database from 'better-sqlite3';

const db = new Database('meditation.db');

export interface Journal {
  id: number;
  content: string;
  day_number: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Reflection {
  id: number;
  mood: string;
  notes: string | null;
  day_number: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export const getJournal = (userId: number, dayNumber: number): Journal | undefined => {
  const stmt = db.prepare('SELECT * FROM journals WHERE user_id = ? AND day_number = ?');
  return stmt.get(userId, dayNumber);
};

export const saveJournal = (content: string, dayNumber: number, userId: number): Journal => {
  const stmt = db.prepare(`
    INSERT INTO journals (content, day_number, user_id, updated_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, day_number) 
    DO UPDATE SET content = excluded.content, updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `);
  return stmt.get(content, dayNumber, userId);
};

export const getReflection = (userId: number, dayNumber: number): Reflection | undefined => {
  const stmt = db.prepare('SELECT * FROM reflections WHERE user_id = ? AND day_number = ?');
  return stmt.get(userId, dayNumber);
};

export const saveReflection = (mood: string, notes: string | null, dayNumber: number, userId: number): Reflection => {
  const stmt = db.prepare(`
    INSERT INTO reflections (mood, notes, day_number, user_id, updated_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, day_number) 
    DO UPDATE SET mood = excluded.mood, notes = excluded.notes, updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `);
  return stmt.get(mood, notes, dayNumber, userId);
};