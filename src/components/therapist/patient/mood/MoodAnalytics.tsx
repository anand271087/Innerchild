import React from 'react';
import { LineChart, BarChart } from 'lucide-react';
import { useMoodData } from '../../../../hooks/useMoodData';

interface MoodAnalyticsProps {
  patientId?: string;
}

export default function MoodAnalytics({ patientId }: MoodAnalyticsProps) {
  const { moodData } = useMoodData(patientId);

  const getMoodCounts = () => {
    return moodData.reduce((acc: Record<string, number>, curr) => {
      acc[curr.mood] = (acc[curr.mood] || 0) + 1;
      return acc;
    }, {});
  };

  const moodCounts = getMoodCounts();

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-600 mb-4 flex items-center">
          <BarChart className="w-4 h-4 mr-2" />
          Mood Distribution
        </h3>
        <div className="space-y-3">
          {Object.entries(moodCounts).map(([mood, count]) => (
            <div key={mood}>
              <div className="flex justify-between text-sm mb-1">
                <span>{mood}</span>
                <span className="text-gray-500">{count} days</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-healing-ocean rounded-full"
                  style={{ width: `${(count / moodData.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-600 mb-4 flex items-center">
          <LineChart className="w-4 h-4 mr-2" />
          Insights
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Most frequent mood: {Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0]}</p>
          <p>• Tracked {moodData.length} days this month</p>
          <p>• Showing improvement in emotional regulation</p>
        </div>
      </div>
    </div>
  );
}