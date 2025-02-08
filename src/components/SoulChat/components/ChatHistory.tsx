import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, Loader2, ChevronDown } from 'lucide-react';
import type { JourneyEntry } from '../../../types/history';

interface ChatHistoryProps {
  history: JourneyEntry[];
  isLoading: boolean;
  onSelect: (entry: JourneyEntry) => void;
  selectedId?: string;
}

export function ChatHistory({ history, isLoading, onSelect, selectedId }: ChatHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-healing-ocean animate-spin" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Journey History
        </h2>
        <p className="text-gray-600">
          Your journey history will appear here once you start your first journey.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Dropdown Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between text-left border-b border-gray-100"
      >
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Previous Journeys
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {history.length} {history.length === 1 ? 'journey' : 'journeys'} available
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
              {history.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    onSelect(entry);
                    setIsExpanded(false);
                  }}
                  className={`p-3 rounded-lg transition-all cursor-pointer group ${
                    entry.id === selectedId
                      ? 'bg-healing-ocean/10 shadow-sm'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium mb-1 line-clamp-2 ${
                        entry.id === selectedId ? 'text-healing-ocean' : 'text-gray-900'
                      }`}>
                        {entry.prompt}
                      </p>
                      <div className="text-sm text-gray-500">
                        {new Date(entry.timestamp).toLocaleDateString()} at{' '}
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-colors flex-shrink-0 ${
                      entry.id === selectedId
                        ? 'text-healing-ocean'
                        : 'text-gray-400 group-hover:text-healing-ocean'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Journey Summary */}
      {selectedId && (
        <div className="p-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Selected Journey</h3>
          {history.map((entry) => entry.id === selectedId && (
            <div key={entry.id} className="bg-healing-ocean/10 rounded-lg p-3">
              <p className="font-medium text-gray-900 mb-1 line-clamp-2">{entry.prompt}</p>
              <div className="text-sm text-gray-500">
                Started on {new Date(entry.timestamp).toLocaleDateString()} at{' '}
                {new Date(entry.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}