import React, { useState } from 'react';
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

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  function getDayImage(day: number): string {
    const images = {
      1: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=400',
      2: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=400',
      3: 'https://images.unsplash.com/photo-1602192509154-0b900ee1f851?auto=format&fit=crop&w=400',
      4: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400',
      5: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=400',
      6: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400',
      7: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=400',
      8: 'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?auto=format&fit=crop&w=400',
      9: 'https://images.unsplash.com/photo-1606103836293-0a063ee20566?auto=format&fit=crop&w=400',
      10: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=400',
      11: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&w=400',
      12: 'https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?auto=format&fit=crop&w=400',
      13: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400',
      14: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=400',
      15: 'https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?auto=format&fit=crop&w=400',
      16: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=400',
      17: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=400',
      18: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400'
    };
    
    return images[day as keyof typeof images] || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400';
  }

  function getDayTitle(day: number): string {
    const titles: Record<number, string> = {
      1: "Mindful Reflections: Your Meditation Journey to Transformation",
      2: "Mindful Reflections: Your Meditation Journey to Transformation",
      3: "Mindful Reflections: Your Meditation Journey to Transformation",
      4: "Focus Forward: Unlocking Your Potential with Mindful Breathing",
      5: "Focus Forward: Unlocking Your Potential with Mindful Breathing",
      6: "Focus Forward: Unlocking Your Potential with Mindful Breathing",
      7: "Childhood Treasures: Reliving Joyful Moments Through Reflection",
      8: "Healing the Past: Confronting Childhood Wounds Through Reflection (upto age 12)",
      9: "Facing Childhood Fears: Understanding the Roots of Anxiety",
      10: "Teenage Triumphs: Celebrating Wins and Joyful Moments",
      11: "Teenage Triumphs: Celebrating Wins and Joyful Moments",
      12: "Teenage Trials: Unpacking Challenges to Foster Growth",
      13: "Creating New Emotional Patterns",
      14: "Setting Healthy Boundaries",
      15: "Rediscovering Joy & Inner Child Play",
      16: "Integrating Past & Present Self",
      17: "Emotional Release & Deep Healing",
      18: "Facing Fears: Reflecting on Worries of Middle and Late Adulthood (Age 31+)",
      19: "Future Visioning & Growth",
      20: "Integration & Celebration"
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
                <span>Experience profound emotional healing through structured daily practices designed to nurture your inner child</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6">🎯</span>
                <span>Break free from limiting patterns and beliefs that have held you back since childhood</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6">💫</span>
                <span>Develop a deeper connection with yourself through guided meditations and reflective journaling</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6">🌈</span>
                <span>Transform anxiety and stress into peace and self-acceptance</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6">💝</span>
                <span>Create lasting positive changes in your relationships and emotional well-being</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6">🔄</span>
                <span>Build sustainable daily practices that continue to support your growth long after the program</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <a 
                href="https://gamma.app/docs/Inner-Transformation-A-55-Day-Guided-Program-r16xk1v65h56z3p?mode=doc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-healing-ocean hover:text-healing-ocean/80"
              >
                <span>View Guided Overview</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
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
              className="relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <button
                onClick={() => setSelectedDay(day)}
                className="w-full text-left focus:outline-none focus:ring-2 focus:ring-healing-ocean focus:ring-opacity-50"
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
              </button>

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