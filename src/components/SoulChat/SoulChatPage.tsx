import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home, MessageCircle, Send, Sparkles, Loader2, Brain, Heart } from 'lucide-react';
import { getChatResponse, getInnerChildAnalysis } from '../../services/openai';
import type { ExerciseResponse } from '../../types/exercises';
import ExerciseGrid from '../ExerciseGrid';
import PreviousJourney from '../PreviousJourney';
import InnerChildAnalysis from '../InnerChildAnalysis';
import { useJourneyHistory } from '../../hooks/useJourneyHistory';
import { saveJourney } from '../../db/database';
import { useAuthStore } from '../../store/authStore';

type Tab = 'exercises' | 'analysis';

export default function SoulChatPage() {
  const [inputText, setInputText] = useState('');
  const [exercises, setExercises] = useState<ExerciseResponse | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('analysis');
  const { journeyHistory, setJourneyHistory, isLoading: isHistoryLoading } = useJourneyHistory();
  const { user } = useAuthStore();

  const handleSubmit = async () => {
    if (!inputText.trim() || isLoading || !user) return;
    setIsLoading(true);
    setError(null);

    try {
      const [exercisesResponse, analysisResponse] = await Promise.all([
        getChatResponse(inputText, []),
        getInnerChildAnalysis(inputText)
      ]);

      // Save journey
      const journeyId = await saveJourney(user.id, inputText, exercisesResponse, analysisResponse);

      // Update journey history
      const newJourney = {
        id: journeyId,
        prompt: inputText,
        exercises: exercisesResponse,
        analysis: analysisResponse,
        timestamp: new Date().toISOString(),
        responses: []
      };

      setExercises(exercisesResponse);
      setAnalysis(analysisResponse);
      setJourneyHistory(prev => [newJourney, ...prev]);

    } catch (error: any) {
      console.error('Failed to get response:', error);
      setError(error.message || 'Failed to analyze. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (entry: any) => {
    setInputText(entry.prompt);
    setExercises(entry.exercises);
    setAnalysis(entry.analysis);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Inner Child Compass</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            {isHistoryLoading ? (
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-healing-ocean animate-spin" />
              </div>
            ) : (
              <PreviousJourney 
                journeys={journeyHistory} 
                onSelect={handleHistorySelect}
              />
            )}
          </div>

          <div className="lg:col-span-3">
            {exercises || analysis ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex space-x-4 mb-8">
                  <button
                    onClick={() => setActiveTab('analysis')}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'analysis'
                        ? 'bg-healing-ocean text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Inner Child Analysis
                  </button>
                  <button
                    onClick={() => setActiveTab('exercises')}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'exercises'
                        ? 'bg-healing-ocean text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Healing Exercises
                  </button>
                </div>

                {activeTab === 'analysis' ? (
                  <InnerChildAnalysis
                    isLoading={isLoading}
                    analysis={analysis?.triggers}
                    error={error}
                  />
                ) : (
                  <ExerciseGrid exercises={exercises || {}} />
                )}
              </div>
            ) : (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <img
                    src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&w=800&q=80"
                    alt="Inner healing journey"
                    className="w-full h-64 object-cover rounded-xl mb-8"
                  />
                  <h1 className="text-3xl font-bold mb-4">Begin Your Inner Healing Journey</h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Share what's on your mind, and receive personalized healing insights to support your growth.
                  </p>
                </motion.div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Share what's on your mind..."
                    className="w-full h-32 p-4 mb-4 border rounded-lg focus:ring-2 focus:ring-healing-ocean focus:border-transparent"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || !inputText.trim()}
                    className="w-full py-3 bg-healing-ocean text-white rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Inner Child Compass
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}