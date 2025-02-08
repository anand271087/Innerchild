import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home, PlusCircle, Brain, Heart } from 'lucide-react';
import { ChatInput } from './components/ChatInput';
import { ChatHistory } from './components/ChatHistory';
import InnerChildAnalysis from '../InnerChildAnalysis';
import ExerciseGrid from '../ExerciseGrid';
import type { JourneyEntry } from '../../types/history';
import { useJourneyHistory } from '../../hooks/useJourneyHistory';

export default function SoulChatPage() {
  const [selectedJourney, setSelectedJourney] = useState<JourneyEntry | null>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'exercises'>('analysis');
  const { journeyHistory, isLoading } = useJourneyHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleHistorySelect = (entry: JourneyEntry) => {
    setSelectedJourney(entry);
    setActiveTab('analysis');
  };

  const handleStartNewJourney = () => {
    setSelectedJourney(null);
  };

  const handleTabChange = (tab: 'analysis' | 'exercises') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Soul Chat</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {/* New Journey Button */}
            {selectedJourney && (
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleStartNewJourney}
                className="w-full group flex items-center justify-center px-6 py-4 bg-white rounded-xl shadow-lg text-healing-ocean hover:bg-healing-ocean hover:text-white transition-all duration-300"
              >
                <PlusCircle className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90 duration-300" />
                <span className="font-medium">New Journey</span>
              </motion.button>
            )}

            {/* Chat History */}
            <ChatHistory 
              history={journeyHistory}
              isLoading={isLoading}
              onSelect={handleHistorySelect}
              selectedId={selectedJourney?.id}
            />
          </div>

          <div className="lg:col-span-3">
            {selectedJourney ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTabChange('analysis')}
                    className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl shadow-lg transition-all duration-300 ${
                      activeTab === 'analysis'
                        ? 'bg-healing-ocean text-white shadow-healing-ocean/25'
                        : 'bg-white text-healing-ocean hover:bg-healing-ocean hover:text-white'
                    }`}
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    <span className="font-medium">Discover</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTabChange('exercises')}
                    className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl shadow-lg transition-all duration-300 ${
                      activeTab === 'exercises'
                        ? 'bg-healing-ocean text-white shadow-healing-ocean/25'
                        : 'bg-white text-healing-ocean hover:bg-healing-ocean hover:text-white'
                    }`}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    <span className="font-medium">Heal</span>
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-8 backdrop-blur-sm bg-white/95"
                >
                  {activeTab === 'analysis' ? (
                    <InnerChildAnalysis
                      isLoading={false}
                      analysis={selectedJourney.analysis}
                      error={null}
                      journeyId={selectedJourney.id}
                      onTabChange={handleTabChange}
                    />
                  ) : (
                    <ExerciseGrid exercises={selectedJourney.exercises} />
                  )}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-8 backdrop-blur-sm bg-white/95"
              >
                <ChatInput onSuccess={setSelectedJourney} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}