import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompletionBadgeProps {
  hasJournal: boolean;
  hasVoiceJournal: boolean;
  hasReflection: boolean;
}

export default function CompletionBadge({ hasJournal, hasVoiceJournal, hasReflection }: CompletionBadgeProps) {
  const totalCompleted = [hasJournal, hasVoiceJournal, hasReflection].filter(Boolean).length;
  const isFullyComplete = totalCompleted === 3;
  
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute top-4 right-4"
    >
      {isFullyComplete ? (
        <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Completed</span>
        </div>
      ) : totalCompleted > 0 ? (
        <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
          <Circle className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{totalCompleted}/3</span>
        </div>
      ) : null}
    </motion.div>
  );
}