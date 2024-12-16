import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Loader2 } from 'lucide-react';
import type { JourneyEntry } from '../../../types/history';

interface ChatHistoryProps {
  history: JourneyEntry[];
  isLoading: boolean;
  onSelect: (entry: JourneyEntry) => void;
  selectedId?: string;
}

export function ChatHistory({ history, isLoading, onSelect, selectedId }: ChatHistoryProps) {
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
          Chat History
        </h2>
        <p className="text-gray-600">
          Your chat history will appear here once you start your first conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6 flex items-center sticky top-0 bg-white pb-4">
        <Clock className="w-5 h-5 mr-2" />
        Chat History
      </h2>
      <div className="space-y-4">
        {history.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onSelect(entry)}
            className={`p-4 rounded-lg transition-colors group cursor-pointer ${
              selectedId === entry.id
                ? 'bg-healing-ocean/10 hover:bg-healing-ocean/20'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 mb-2">
                  {entry.prompt}
                </p>
                <div className="text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleDateString()} at{' '}
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 transition-colors ${
                selectedId === entry.id
                  ? 'text-healing-ocean'
                  : 'text-gray-400 group-hover:text-healing-ocean'
              }`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}