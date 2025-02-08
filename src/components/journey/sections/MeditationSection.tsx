import React from 'react';
import { Moon, Play } from 'lucide-react';

const meditations = [
  {
    id: 1,
    title: "Morning Mindfulness",
    duration: "5 min",
    description: "Start your day with clarity and purpose",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    title: "Inner Child Healing",
    duration: "10 min",
    description: "Connect with and nurture your inner child",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    title: "Emotional Release",
    duration: "15 min",
    description: "Let go of stored emotions with compassion",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=200"
  }
];

export default function MeditationSection() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Moon className="w-6 h-6 mr-2 text-healing-ocean" />
        My Meditations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meditations.map((meditation) => (
          <div key={meditation.id} className="bg-gray-50 rounded-lg overflow-hidden group">
            <div className="relative h-40">
              <img
                src={meditation.image}
                alt={meditation.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-3 bg-white rounded-full">
                  <Play className="w-6 h-6 text-healing-ocean" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {meditation.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{meditation.title}</h3>
              <p className="text-sm text-gray-600">{meditation.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}