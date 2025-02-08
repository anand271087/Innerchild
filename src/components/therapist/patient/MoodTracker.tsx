import React from 'react';
import { LineChart, Heart } from 'lucide-react';

interface MoodTrackerProps {
  patientId?: string;
}

export default function MoodTracker({ patientId }: MoodTrackerProps) {
  const moodData = [
    { day: 1, mood: "Happy", date: "2024-03-22", notes: "Felt energetic and positive" },
    { day: 2, mood: "Calm", date: "2024-03-23", notes: "Peaceful after meditation" },
    { day: 3, mood: "Anxious", date: "2024-03-24", notes: "Triggered by work stress" },
    { day: 4, mood: "Content", date: "2024-03-25", notes: "Good progress in therapy" },
    { day: 5, mood: "Happy", date: "2024-03-26", notes: "Breakthrough in session" }
  ];

  const moodColors: Record<string, string> = {
    Happy: "bg-green-500",
    Calm: "bg-blue-500",
    Anxious: "bg-yellow-500",
    Content: "bg-purple-500"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Heart className="w-5 h-5 mr-2 text-healing-ocean" />
        Daily Mood Tracker
      </h2>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-5 gap-4 mb-8">
            {moodData.map((data, index) => (
              <div key={index} className="text-center">
                <div className="mb-2">Day {data.day}</div>
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-2 ${moodColors[data.mood]}`}
                  title={data.mood}
                />
                <div className="text-sm text-gray-600">{data.mood}</div>
                <div className="text-xs text-gray-500">{new Date(data.date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {moodData.map((data, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-3 h-3 rounded-full mt-1 ${moodColors[data.mood]}`} />
                <div>
                  <div className="text-sm font-medium">
                    {new Date(data.date).toLocaleDateString()} - {data.mood}
                  </div>
                  <div className="text-sm text-gray-600">{data.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}