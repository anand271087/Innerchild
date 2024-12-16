import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { ChatInput } from './components/ChatInput';
import { ChatHistory } from './components/ChatHistory';
import { ChatTabs } from './components/ChatTabs';
import { useJourneyHistory } from '../../hooks/useJourneyHistory';
import InnerChildAnalysis from '../InnerChildAnalysis';
import ExerciseGrid from '../ExerciseGrid';
import type { JourneyEntry } from '../../types/history';

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

  return (
    <div className="flex-1 bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Soul Chat</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ChatHistory 
              history={journeyHistory}
              isLoading={isLoading}
              onSelect={handleHistorySelect}
              selectedId={selectedJourney?.id}
            />
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              {selectedJourney ? (
                <>
                  <ChatTabs 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                  />
                  {activeTab === 'analysis' ? (
                    <InnerChildAnalysis
                      isLoading={false}
                      analysis={selectedJourney.analysis}
                      error={null}
                      journeyId={selectedJourney.id}
                    />
                  ) : (
                    <ExerciseGrid exercises={selectedJourney.exercises} />
                  )}
                </>
              ) : (
                <ChatInput onSuccess={setSelectedJourney} />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}