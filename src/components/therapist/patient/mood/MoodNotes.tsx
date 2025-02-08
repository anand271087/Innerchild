import React from 'react';
import { FileText } from 'lucide-react';
import { useMoodData } from '../../../../hooks/useMoodData';

interface MoodNotesProps {
  patientId?: string;
  selectedDate: Date | null;
}

export default function MoodNotes({ patientId, selectedDate }: MoodNotesProps) {
  const { moodData } = useMoodData(patientId);

  const selectedMood = selectedDate 
    ? moodData.find(m => new Date(m.date).toDateString() === selectedDate.toDateString())
    : null;

  if (!selectedDate || !selectedMood) {
    return null;
  }

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-healing-ocean" />
        Notes for {selectedDate.toLocaleDateString()}
      </h3>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-600">Mood:</span>
          <span className="ml-2">{selectedMood.mood}</span>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-600">Journal Entry:</span>
          <p className="mt-2 text-gray-600">{selectedMood.notes}</p>
        </div>

        {selectedMood.triggers && (
          <div className="mt-4">
            <span className="text-sm font-medium text-gray-600">Triggers:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedMood.triggers.map((trigger: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-healing-ocean/10 text-healing-ocean text-sm rounded-full"
                >
                  {trigger}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}