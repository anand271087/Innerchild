import express from 'express';
import { getJournal, saveJournal, getReflection, saveReflection } from '../db';

const app = express();
app.use(express.json());

// Journal endpoints
app.post('/api/journal', (req, res) => {
  const { content, dayNumber, userId } = req.body;
  try {
    const journal = saveJournal(content, dayNumber, userId);
    res.json(journal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save journal entry' });
  }
});

app.get('/api/journal/:userId/:dayNumber', (req, res) => {
  const { userId, dayNumber } = req.params;
  try {
    const journal = getJournal(parseInt(userId), parseInt(dayNumber));
    res.json(journal || { content: '' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch journal entry' });
  }
});

// Reflection endpoints
app.post('/api/reflection', (req, res) => {
  const { mood, notes, dayNumber, userId } = req.body;
  try {
    const reflection = saveReflection(mood, notes, dayNumber, userId);
    res.json(reflection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save reflection' });
  }
});

app.get('/api/reflection/:userId/:dayNumber', (req, res) => {
  const { userId, dayNumber } = req.params;
  try {
    const reflection = getReflection(parseInt(userId), parseInt(dayNumber));
    res.json(reflection || { mood: '', notes: '' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reflection' });
  }
});

export default app;