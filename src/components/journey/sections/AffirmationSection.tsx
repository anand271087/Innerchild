import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const affirmations = [
  {
    id: 1,
    text: "I am worthy of love and respect",
    theme: "Self-Worth"
  },
  {
    id: 2,
    text: "My inner child is safe and loved",
    theme: "Inner Child"
  },
  {
    id: 3,
    text: "I trust my journey of healing",
    theme: "Healing"
  }
];

export default function AffirmationSection() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Heart className="w-6 h-6 mr-2 text-healing-ocean" />
        My Affirmations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {affirmations.map((affirmation) => (
          <div
            key={affirmation.id}
            className="bg-gradient-to-br from-healing-mint to-healing-lavender p-6 rounded-lg relative group hover:scale-105 transition-transform"
          >
            <Sparkles className="w-5 h-5 text-healing-ocean absolute top-4 right-4 opacity-50" />
            <div className="mb-4">
              <span className="text-sm text-healing-ocean font-medium">
                {affirmation.theme}
              </span>
            </div>
            <p className="text-lg font-medium text-gray-800">
              {affirmation.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}