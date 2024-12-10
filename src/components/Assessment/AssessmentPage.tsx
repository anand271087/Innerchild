import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import AssessmentResults from './AssessmentResults';

interface Question {
  id: number;
  text: string;
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "When faced with a challenging situation, you typically do this:",
    options: [
      { id: 'A', text: "Feel overwhelmed by emotions from past experiences" },
      { id: 'B', text: "Withdraw and handle it alone" },
      { id: 'C', text: "Try to make light of the situation" },
      { id: 'D', text: "Believe everything will work out perfectly" }
    ]
  },
  {
    id: 2,
    text: "In relationships, you find yourself:",
    options: [
      { id: 'A', text: "Afraid of being hurt again" },
      { id: 'B', text: "Cautious about getting too close" },
      { id: 'C', text: "Keeping things playful and light" },
      { id: 'D', text: "Expecting fairy-tale outcomes" }
    ]
  },
  {
    id: 3,
    text: "When making decisions, you usually:",
    options: [
      { id: 'A', text: "Worry about making the wrong choice" },
      { id: 'B', text: "Rely solely on yourself" },
      { id: 'C', text: "Go with what feels fun" },
      { id: 'D', text: "Follow your dreams regardless of practicality" }
    ]
  },
  {
    id: 4,
    text: "During conflict, you tend to:",
    options: [
      { id: 'A', text: "Feel deeply hurt and vulnerable" },
      { id: 'B', text: "Distance yourself emotionally" },
      { id: 'C', text: "Try to turn it into a joke" },
      { id: 'D', text: "Expect an immediate perfect resolution" }
    ]
  },
  {
    id: 5,
    text: "When plans change unexpectedly, you:",
    options: [
      { id: 'A', text: "Feel personally rejected" },
      { id: 'B', text: "Prefer to make your own plans anyway" },
      { id: 'C', text: "Easily adapt and find something fun to do" },
      { id: 'D', text: "Believe something even better will happen" }
    ]
  }
];

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showResults, setShowResults] = useState(false);

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

  const isComplete = Object.keys(answers).length === questions.length;

  const handleSubmit = () => {
    if (isComplete) {
      setShowResults(true);
    }
  };

  if (showResults) {
    return <AssessmentResults results={calculateResults()} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="space-y-8">
            {questions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {question.id}. {question.text}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={answers[question.id] === option.id}
                        onChange={() => handleAnswer(question.id, option.id)}
                        className="w-4 h-4 text-healing-ocean"
                      />
                      <span className="text-gray-700">{option.text}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className={`px-8 py-3 rounded-lg font-medium text-white transition-colors ${
                isComplete
                  ? 'bg-healing-ocean hover:bg-opacity-90'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              View Your Results
            </button>
            {!isComplete && (
              <p className="mt-2 text-sm text-gray-500">
                Please answer all questions to see your results
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}