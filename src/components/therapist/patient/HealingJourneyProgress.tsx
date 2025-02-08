import React from 'react';
import { Trophy, CheckCircle } from 'lucide-react';

interface HealingJourneyProgressProps {
  patientId?: string;
}

export default function HealingJourneyProgress({ patientId }: HealingJourneyProgressProps) {
  const progress = {
    completedDays: 31,
    totalDays: 48,
    recentMilestones: [
      "Completed Inner Child Assessment",
      "Finished Week 6 Meditation",
      "Achieved Emotional Awareness Goal"
    ]
  };

  const percentage = Math.round((progress.completedDays / progress.totalDays) * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-healing-ocean" />
        48-Day Healing Journey Progress
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Overall Progress</span>
          <span className="text-sm font-medium text-healing-ocean">{percentage}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-healing-ocean rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {progress.completedDays} of {progress.totalDays} days completed
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Recent Milestones</h3>
        <div className="space-y-2">
          {progress.recentMilestones.map((milestone, index) => (
            <div key={index} className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>{milestone}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}