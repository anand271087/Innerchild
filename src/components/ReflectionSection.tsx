import React from 'react';
import { Save } from 'lucide-react';

interface ReflectionSectionProps {
  selectedMoods: string[];
  onMoodToggle: (mood: string) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
  onSave: () => void;
}

export default function ReflectionSection({
  selectedMoods,
  onMoodToggle,
  notes,
  onNotesChange,
  onSave
}: ReflectionSectionProps) {
  const moods = [
    'Calm', 'Relaxed', 'Peaceful', 'Energized', 'Focused',
    'Grateful', 'Happy', 'Inspired', 'Mindful', 'Refreshed'
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">🌈 Reflection</h3>
      <div className="mb-6">
        <p className="mb-3">How are you feeling? (Select all that apply)</p>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => onMoodToggle(mood)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedMoods.includes(mood)
                  ? 'bg-healing-ocean text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-healing-ocean focus:border-transparent"
        placeholder="Add any additional notes about your experience..."
      />
      <button
        onClick={onSave}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Reflection
      </button>
    </div>
  );
}