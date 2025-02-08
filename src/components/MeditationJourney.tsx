import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ChevronDown, Home, ChevronRight, ExternalLink } from 'lucide-react';
import { useJourneyProgress } from '../hooks/useJourneyProgress';
import MeditationDay from './MeditationDay';
import CompletionBadge from './CompletionBadge';

const DEMO_USER_ID = 1;
const INITIAL_CARDS = 12;

export default function MeditationJourney() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const progress = useJourneyProgress(DEMO_USER_ID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  function getDayImage(day: number): string {
    const images = {
      1: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=400',
      2: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=400',
      3: 'https://images.unsplash.com/photo-1602192509154-0b900ee1f851?auto=format&fit=crop&w=400',
      4: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400'
    };
    return images[day as keyof typeof images] || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400';
  }

  function getDayTitle(day: number): string {
    const titles: Record<number, string> = {
      1: "Mindful Reflections: Your Meditation Journey to Transformation",
      2: "Focus Forward: Unlocking Your Potential with Mindful Breathing",
      3: "Childhood Treasures: Reliving Joyful Moments Through Reflection",
      4: "Healing the Past: Confronting Childhood Wounds"
    };
    return titles[day] || `Day ${day}: Continue Your Journey`;
  }

  if (selectedDay !== null) {
    return <MeditationDay onBack={() => setSelectedDay(null)} dayNumber={selectedDay} />;
  }

  const visibleDays = showAll ? 48 : INITIAL_CARDS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">48-Day Inner Child Healing Journey</span>
        </nav>

        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Your 48-Day Inner Child Healing Journey
          </h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">✨ Why This Journey Will Transform Your Life</h2>
            <ul className="text-left space-y-4">
              <li className="flex items-start">
                <span className="inline-block w-6">🌱</span>
                <span>Experience profound emotional healing through structured daily practices</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6">🎯</span>
                <span>Break free from limiting patterns and beliefs</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6">💫</span>
                <span>Develop a deeper connection with yourself</span>
              </li>
            </ul>
          </div>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Array.from({ length: visibleDays }, (_, i) => i + 1).map((day) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (day % 10) * 0.1 }}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setSelectedDay(day)}
            >
              <div className="relative h-48">
                <img
                  src={getDayImage(day)}
                  alt={`Day ${day}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg font-semibold">
                    Day {day}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {getDayTitle(day)}
                  </p>
                </div>
              </div>

              {progress[day] && (
                <CompletionBadge
                  hasJournal={progress[day].hasJournal}
                  hasVoiceJournal={progress[day].hasVoiceJournal}
                  hasReflection={progress[day].hasReflection}
                />
              )}
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90 transition-colors duration-300"
            >
              <ChevronDown className="w-5 h-5 mr-2" />
              Show More Days
            </button>
          </div>
        )}
      </div>
    </div>
  );
}