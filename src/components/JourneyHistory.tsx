import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import type { JourneyEntry } from '../types/history';

interface JourneyHistoryProps {
  history: JourneyEntry[];
  onSelect: (entry: JourneyEntry) => void;
}

export default function JourneyHistory({ history, onSelect }: JourneyHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        Previous Journeys
      </h2>
      <div className="space-y-3">
        {history.map((entry) => (
          <motion.button
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onSelect(entry)}
            className="w-full text-left p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 mb-1">{entry.prompt}</p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleDateString()} at{' '}
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-healing-ocean transition-colors" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}