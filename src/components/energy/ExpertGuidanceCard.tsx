import React from 'react';
import { Lightbulb } from 'lucide-react';
import { ActionButton } from '../shared/ActionButton';

export default function ExpertGuidanceCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="mb-4">
        <Lightbulb className="w-6 h-6 text-healing-ocean" />
      </div>
      <h3 className="text-lg font-semibold mb-3">Expert Guidance</h3>
      <p className="text-gray-600 mb-4">Live sessions with certified therapists and spiritual guides</p>

      <div className="flex items-center mb-4">
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop" className="w-12 h-12 rounded-full mr-3" alt="Dr. Purnima" />
        <div>
          <p className="font-medium">Dr. Purnima J.</p>
          <p className="text-green-500 text-sm">Available Now</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium">Next Session:</p>
        <p className="text-healing-ocean">"Healing Inner Child Wounds"</p>
        <p className="text-sm text-gray-600">Today, 3:00 PM EST</p>
      </div>

      <ActionButton icon={<Lightbulb className="w-4 h-4" />} label="Book Session" />
    </div>
  );
}