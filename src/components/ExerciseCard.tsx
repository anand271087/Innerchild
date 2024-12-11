import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Trophy } from 'lucide-react';
import { Exercise } from '../types/exercises';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

interface ExerciseCardProps {
  title: string;
  exercise: Exercise;
}

const celebrationMessages = [
  "🌟 Amazing work! You're taking wonderful steps in your healing journey!",
  "💫 Incredible progress! Your inner child is feeling the love!",
  "🎉 You're doing fantastic! Keep nurturing yourself!",
  "✨ Beautiful work! Each step forward is a victory!",
  "🌈 You're glowing! This dedication to healing is inspiring!",
  "💝 Wonderful job! You're growing stronger every day!",
  "🌺 Magnificent effort! Your future self will thank you!",
  "⭐ Outstanding! You're creating positive change!",
  "🎨 Brilliant work! Your inner child is dancing with joy!",
  "🌟 Superstar! You're rewriting your story with love!"
];

export default function ExerciseCard({ title, exercise }: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  // Load completion status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem(`exercise-${title}-${exercise.title}`);
    if (savedStatus) {
      setIsCompleted(JSON.parse(savedStatus));
    }
  }, [title, exercise.title]);

  const handleCompletion = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    localStorage.setItem(
      `exercise-${title}-${exercise.title}`,
      JSON.stringify(newStatus)
    );

    if (newStatus) {
      // Show celebration
      setShowConfetti(true);
      setCelebrationMessage(
        celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)]
      );

      // Hide celebration after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
        setCelebrationMessage('');
      }, 5000);
    }
  };

  return (
    <>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden w-full relative group"
      >
        <AnimatePresence>
          {celebrationMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute top-0 left-0 right-0 z-50 -mt-12"
            >
              <div className="bg-white px-6 py-3 rounded-full shadow-lg mx-auto w-max">
                <p className="text-xl font-bold text-healing-ocean">
                  {celebrationMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-healing-ocean mb-1">
                {title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h3>
              <h4 className="text-xl font-bold mb-2">{exercise.title}</h4>
              <p className="text-gray-600">{exercise.goal}</p>
            </div>
            
            {/* Updated Completion Button */}
            <button
              onClick={handleCompletion}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-healing-ocean hover:text-white'
              }`}
            >
              {isCompleted ? (
                <>
                  <Trophy className="w-5 h-5" />
                  <span className="text-sm font-medium">Completed!</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Mark Complete</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-healing-ocean hover:text-healing-ocean/80 transition-colors"
          >
            <span className="text-sm font-medium">
              {isExpanded ? 'Show Less' : 'Show More'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t mt-4">
                  <h5 className="font-medium mb-2">Steps:</h5>
                  <ol className="list-decimal list-inside space-y-2">
                    {exercise.steps.map((step, index) => (
                      <li key={index} className="text-gray-700">{step}</li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isCompleted && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-green-600 text-sm flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Exercise completed! Great work on your healing journey!
              </p>
            </div>
          )}
        </div>

        {!isCompleted && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-healing-ocean/20 to-healing-ocean/20 group-hover:from-healing-ocean to-healing-ocean transition-all duration-500"></div>
        )}
      </motion.div>
    </>
  );
}