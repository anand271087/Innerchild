import React from 'react';
import { Flame } from 'lucide-react';

const rituals = [
  {
    id: 1,
    title: "Morning Self-Care",
    steps: [
      "Light a candle",
      "5 minutes of deep breathing",
      "Write three gratitudes"
    ],
    duration: "15 min"
  },
  {
    id: 2,
    title: "Inner Child Connection",
    steps: [
      "Find a quiet space",
      "Hold a childhood photo",
      "Practice loving dialogue"
    ],
    duration: "20 min"
  },
  {
    id: 3,
    title: "Evening Release",
    steps: [
      "Journal your feelings",
      "Gentle stretching",
      "Forgiveness practice"
    ],
    duration: "15 min"
  }
];

export default function RitualSection() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Flame className="w-6 h-6 mr-2 text-healing-ocean" />
        My Rituals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rituals.map((ritual) => (
          <div key={ritual.id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">{ritual.title}</h3>
              <span className="text-sm text-healing-ocean">{ritual.duration}</span>
            </div>
            <ol className="space-y-2">
              {ritual.steps.map((step, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-healing-ocean/10 text-healing-ocean text-sm flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}