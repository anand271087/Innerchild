import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import AssessmentQuestions from './AssessmentQuestions';
import AssessmentResults from './AssessmentResults';

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showResults, setShowResults] = useState(false);

  // Add scroll to top effect when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnswer = (questionId: number, answer: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateResults = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(answers).forEach(answer => {
      counts[answer]++;
    });
    return counts;
  };

  const isComplete = Object.keys(answers).length === 5;

  const handleSubmit = () => {
    if (isComplete) {
      setShowResults(true);
      // Scroll to top when showing results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (showResults) {
    return <AssessmentResults results={calculateResults()} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Inner Child Assessment</span>
        </nav>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Discover Your Inner Child Pattern
          </h1>
          
          <p className="text-gray-600 mb-8 text-center">
            Answer these questions honestly to understand your inner child's patterns and needs.
          </p>

          <AssessmentQuestions
            answers={answers}
            onAnswer={handleAnswer}
            onSubmit={handleSubmit}
            isComplete={isComplete}
          />
        </div>
      </div>
    </div>
  );
}