import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Trash2 } from 'lucide-react';
import type { JourneyEntry } from '../types/history';
import { db } from '../db';

interface PreviousJourneyProps {
  journeys: JourneyEntry[];
  onSelect: (journey: JourneyEntry) => void;
  onDelete?: (journeyId: string) => void;
}

export default function PreviousJourney({ journeys, onSelect, onDelete }: PreviousJourneyProps) {
  const handleDelete = async (e: React.MouseEvent, journeyId: string) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this journey?')) {
      try {
        await db.deleteJourney(journeyId);
        onDelete?.(journeyId);
      } catch (error) {
        console.error('Failed to delete journey:', error);
        alert('Failed to delete journey. Please try again.');
      }
    }
  };

  if (journeys.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Previous Journeys
        </h2>
        <p className="text-gray-600">No previous journeys yet. Start your first healing journey!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6 flex items-center sticky top-0 bg-white pb-4">
        <Clock className="w-5 h-5 mr-2" />
        Previous Journeys
      </h2>
      <div className="space-y-4">
        {journeys.map((journey) => (
          <motion.div
            key={journey.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group relative"
          >
            <div 
              onClick={() => onSelect(journey)}
              className="cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 mb-2">
                    {journey.prompt}
                  </p>
                  <div className="text-sm text-gray-500">
                    {new Date(journey.timestamp).toLocaleDateString()} at{' '}
                    {new Date(journey.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-2">
                  {onDelete && (
                    <button
                      onClick={(e) => handleDelete(e, journey.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete journey"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-healing-ocean transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}