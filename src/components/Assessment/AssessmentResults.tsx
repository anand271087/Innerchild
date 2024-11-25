import React from 'react';
import { motion } from 'framer-motion';
import { Home, ChevronRight, ArrowRight } from 'lucide-react';

interface ResultsProps {
  results: {
    A: number;
    B: number;
    C: number;
    D: number;
  };
}

const resultDescriptions = {
  'Wounded Child': {
    description: "You may be triggered by situations that remind you of past hurts or moments where you felt unseen or unworthy. Focusing on self-compassion and healing is important.",
    recommendations: [
      "Practice daily self-compassion exercises",
      "Work with a therapist to process past hurts",
      "Keep a healing journal",
      "Join support groups or healing circles"
    ]
  },
  'Orphan Child': {
    description: "You might feel triggered by situations where trust or connection is threatened, leading you to protect yourself by withdrawing. Building trust and nurturing supportive relationships can help.",
    recommendations: [
      "Gradually build trust in safe relationships",
      "Practice vulnerability in small steps",
      "Join community activities",
      "Work on establishing boundaries"
    ]
  },
  'Eternal Child': {
    description: "Your triggers often come from moments when you need to be serious or responsible. Finding a balance between fun and responsibility is key to growth.",
    recommendations: [
      "Create structured routines with room for play",
      "Set small, achievable goals",
      "Practice mindfulness",
      "Balance responsibilities with fun activities"
    ]
  },
  'Magical Child': {
    description: "You might feel triggered when reality doesn't match your hopeful or dream-like expectations. Grounding yourself while holding onto optimism helps create balance.",
    recommendations: [
      "Practice grounding exercises",
      "Set realistic goals while maintaining hope",
      "Balance dreaming with practical action steps",
      "Develop emotional resilience"
    ]
  }
};

export default function AssessmentResults({ results }: ResultsProps) {
  const determineType = () => {
    const max = Math.max(results.A, results.B, results.C, results.D);
    if (results.A === max) return 'Wounded Child';
    if (results.B === max) return 'Orphan Child';
    if (results.C === max) return 'Eternal Child';
    return 'Magical Child';
  };

  const type = determineType();
  const typeInfo = resultDescriptions[type as keyof typeof resultDescriptions];

  const handleStartJourney = () => {
    window.location.hash = 'meditation-journey';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Assessment Results</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Your Inner Child Type: {type}
          </h1>

          <div className="mb-8 p-6 bg-healing-mint/20 rounded-lg">
            <p className="text-gray-700 text-lg">
              {typeInfo.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Healing Recommendations</h2>
            <ul className="space-y-3">
              {typeInfo.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-gray-700"
                >
                  <ArrowRight className="w-4 h-4 mr-2 text-healing-ocean" />
                  {rec}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={handleStartJourney}
              className="inline-block px-8 py-3 bg-healing-ocean text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Begin Your Healing Journey
            </button>
            <p className="text-sm text-gray-500">
              Start your 48-day guided meditation and healing program
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}