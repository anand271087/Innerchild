import React, { useState, useEffect } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import VoiceJournal from './VoiceJournal';
import JournalEntry from './JournalEntry';
import MeditationAudio from './MeditationAudio';
import ReflectionSection from './ReflectionSection';
import journeyData from '../data/meditationJourneyData.json';

const DEMO_USER_ID = 1;

const celebrationMessages = [
  "🌟 Amazing work! Your future self will thank you!",
  "💫 You're doing incredible things for your inner child!",
  "🎉 That's the spirit! Keep nurturing yourself!",
  "✨ Beautiful reflection! You're growing every day!",
  "🌈 Wonderful job! Your journey is inspiring!",
];

interface MeditationDayProps {
  onBack: () => void;
  dayNumber?: number;
}

const MeditationDay: React.FC<MeditationDayProps> = ({ onBack, dayNumber = 1 }) => {
  const [journalEntry, setJournalEntry] = useState(() => {
    return localStorage.getItem(`journal-${DEMO_USER_ID}-${dayNumber}`) || '';
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState<string[]>(() => {
    const saved = localStorage.getItem(`reflection-${DEMO_USER_ID}-${dayNumber}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.moods || [];
      } catch {
        return [];
      }
    }
    return [];
  });
  
  const [reflectionNotes, setReflectionNotes] = useState(() => {
    const saved = localStorage.getItem(`reflection-${DEMO_USER_ID}-${dayNumber}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.notes || '';
      } catch {
        return '';
      }
    }
    return '';
  });
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getDayData = (day: number) => {
    return journeyData.days[day as keyof typeof journeyData.days];
  };

  const getDayDescription = (day: number) => {
    const dayData = getDayData(day);
    
    if (dayData) {
      return (
        <div className="mb-8 bg-healing-mint/20 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Today's Journey</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">
                📝 Journaling ({dayData.journaling.duration}) - {dayData.title}
              </h3>
              <div className="text-gray-600 mt-1">
                <p className="mb-2">In Journaling:</p>
                <ul className="list-disc list-inside space-y-2">
                  {dayData.journaling.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="font-medium">
                🧘‍♀️ Meditation ({dayData.meditation.duration}) - {dayData.meditation.type}
              </h3>
              <p className="text-gray-600">
                Then listen to the {dayData.meditation.type} meditation.
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const celebrate = () => {
    setShowConfetti(true);
    setCelebrationMessage(celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)]);
    setTimeout(() => {
      setShowConfetti(false);
      setCelebrationMessage('');
    }, 5000);
  };

  const handleSaveJournal = () => {
    setIsSaving(true);
    try {
      localStorage.setItem(`journal-${DEMO_USER_ID}-${dayNumber}`, journalEntry);
      window.dispatchEvent(new Event('journeyProgressUpdate'));
      setTimeout(() => {
        setIsSaving(false);
        celebrate();
      }, 500);
    } catch (err) {
      console.error('Failed to save journal:', err);
      setIsSaving(false);
    }
  };

  const handleMoodToggle = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood) 
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
  };

  const handleSaveReflection = () => {
    try {
      const reflectionData = {
        moods: selectedMoods,
        notes: reflectionNotes,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(
        `reflection-${DEMO_USER_ID}-${dayNumber}`,
        JSON.stringify(reflectionData)
      );
      window.dispatchEvent(new Event('journeyProgressUpdate'));
      celebrate();
    } catch (err) {
      console.error('Failed to save reflection:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      
      <AnimatePresence>
        {celebrationMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white px-6 py-3 rounded-full shadow-lg text-xl font-bold text-healing-ocean">
              {celebrationMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <button onClick={() => window.location.href = '/'} className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button onClick={onBack} className="text-healing-ocean hover:text-healing-ocean/80">
            Guided Journalling
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Day {dayNumber}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Day {dayNumber}: Inner Child Healing Session
          </h1>

          {getDayDescription(dayNumber)}

          <div className="space-y-8">
            <JournalEntry
              value={journalEntry}
              onChange={setJournalEntry}
              onSave={handleSaveJournal}
              isSaving={isSaving}
            />

            <VoiceJournal userId={DEMO_USER_ID} dayNumber={dayNumber} />
            
            <MeditationAudio dayNumber={dayNumber} />

            <ReflectionSection
              selectedMoods={selectedMoods}
              onMoodToggle={handleMoodToggle}
              notes={reflectionNotes}
              onNotesChange={setReflectionNotes}
              onSave={handleSaveReflection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationDay;