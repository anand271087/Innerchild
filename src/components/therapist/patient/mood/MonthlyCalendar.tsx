import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMoodData } from '../../../../hooks/useMoodData';

interface MonthlyCalendarProps {
  patientId?: string;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export default function MonthlyCalendar({ patientId, selectedDate, onDateSelect }: MonthlyCalendarProps) {
  const { moodData } = useMoodData(patientId);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const getMoodForDate = (date: Date) => {
    return moodData.find(m => 
      new Date(m.date).toDateString() === date.toDateString()
    )?.mood;
  };

  const getMoodColor = (mood?: string) => {
    const colors: Record<string, string> = {
      'Very Happy': 'bg-green-500',
      'Happy': 'bg-green-400',
      'Content': 'bg-blue-400',
      'Neutral': 'bg-gray-400',
      'Anxious': 'bg-yellow-400',
      'Sad': 'bg-indigo-400',
      'Depressed': 'bg-purple-400',
      'Angry': 'bg-red-400'
    };
    return mood ? colors[mood] : 'bg-gray-200';
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1);
          const mood = getMoodForDate(date);
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          
          return (
            <button
              key={index}
              onClick={() => onDateSelect(date)}
              className={`aspect-square rounded-lg relative hover:ring-2 hover:ring-healing-ocean transition-all
                ${isSelected ? 'ring-2 ring-healing-ocean' : ''}`}
            >
              <div className={`absolute inset-2 rounded-lg ${getMoodColor(mood)}`} />
              <span className="absolute top-1 left-1 text-xs">
                {index + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}