import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Exercise } from '../types/exercises';
import { motion, AnimatePresence } from 'framer-motion';

interface ExerciseCardProps {
  title: string;
  exercise: Exercise;
}

export default function ExerciseCard({ title, exercise }: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden w-full"
    >
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-healing-ocean mb-1">
            {title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h3>
          <h4 className="text-xl font-bold mb-2">{exercise.title}</h4>
          <p className="text-gray-600">{exercise.goal}</p>
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
      </div>
    </motion.div>
  );
}