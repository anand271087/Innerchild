import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import MonthlyCalendar from './MonthlyCalendar';
import MoodAnalytics from './MoodAnalytics';
import MoodLegend from './MoodLegend';
import MoodNotes from './MoodNotes';

interface MoodTrackerProps {
  patientId?: string;
}

export default function MoodTracker({ patientId }: MoodTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Heart className="w-5 h-5 mr-2 text-healing-ocean" />
        Monthly Mood Tracker
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MonthlyCalendar 
            patientId={patientId} 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
          <MoodLegend />
        </div>
        <div>
          <MoodAnalytics patientId={patientId} />
        </div>
      </div>

      <div className="mt-8">
        <MoodNotes patientId={patientId} selectedDate={selectedDate} />
      </div>
    </div>
  );
}