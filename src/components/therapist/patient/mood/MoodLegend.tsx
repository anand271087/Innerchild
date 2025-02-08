import React from 'react';

export default function MoodLegend() {
  const moods = [
    { name: 'Very Happy', color: 'bg-green-500' },
    { name: 'Happy', color: 'bg-green-400' },
    { name: 'Content', color: 'bg-blue-400' },
    { name: 'Neutral', color: 'bg-gray-400' },
    { name: 'Anxious', color: 'bg-yellow-400' },
    { name: 'Sad', color: 'bg-indigo-400' },
    { name: 'Depressed', color: 'bg-purple-400' },
    { name: 'Angry', color: 'bg-red-400' }
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {moods.map(mood => (
        <div key={mood.name} className="flex items-center">
          <div className={`w-4 h-4 rounded-full ${mood.color} mr-2`} />
          <span className="text-sm text-gray-600">{mood.name}</span>
        </div>
      ))}
    </div>
  );
}