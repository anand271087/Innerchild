import React from 'react';
import { Sparkles } from 'lucide-react';
import { ActionButton } from '../shared/ActionButton';
import { ProgressBar } from '../shared/ProgressBar';

export default function CosmicEventCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="mb-4">
        <Sparkles className="w-6 h-6 text-healing-ocean" />
      </div>
      <h3 className="text-lg font-semibold mb-3">Cosmic Alignment Events</h3>
      <p className="text-gray-600 mb-4">Experience powerful group meditations aligned with celestial events</p>

      <div className="mb-4">
        <div className="bg-healing-mint/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-healing-ocean font-medium">Full Moon Ceremony</span>
            <div className="bg-yellow-400 w-4 h-4 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600">Dec 15th 2025, 7:00 PM EST</p>
          <ProgressBar progress={60} />
          <p className="text-xs text-gray-500 mt-1">142 spots remaining</p>
        </div>

        <div className="flex items-center text-gray-600 text-sm mt-4">
          <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
          <span>New Moon</span>
          <span className="ml-auto">May 8th</span>
        </div>
      </div>

      <ActionButton icon={<Sparkles className="w-4 h-4" />} label="Join Event" />
    </div>
  );
}