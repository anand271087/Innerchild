import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

let db: any = null;

export async function initDatabase() {
  if (db) return db;

  try {
    const sqlite3 = await sqlite3InitModule({
      print: console.log,
      printErr: console.error,
    });

    const opfsDb = await sqlite3.oo1.OpfsDb('journeys.db');
    db = opfsDb;

    await createTables();
    await insertDemoUser();

    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

async function createTables() {
  const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT
    );

    CREATE TABLE IF NOT EXISTS journeys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      prompt TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS journey_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      journey_id INTEGER NOT NULL,
      heading TEXT NOT NULL,
      response TEXT NOT NULL,
      audio_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (journey_id) REFERENCES journeys (id),
      UNIQUE(journey_id, heading)
    );
  `;

  await db.exec(schema);
}

async function insertDemoUser() {
  await db.exec(`
    INSERT OR IGNORE INTO users (id, email, name) 
    VALUES (1, 'demo@example.com', 'Demo User')
  `);
}

export { db };