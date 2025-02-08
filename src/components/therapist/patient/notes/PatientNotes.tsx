import React from 'react';
import { MessageCircle } from 'lucide-react';

interface PatientNotesProps {
  patientId?: string;
}

export default function PatientNotes({ patientId }: PatientNotesProps) {
  const notes = [
    {
      id: 1,
      content: "Today's session helped me understand my reactions better. I'm starting to recognize patterns from my childhood.",
      date: "2024-03-28",
      mood: "Hopeful"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <MessageCircle className="w-5 h-5 mr-2 text-healing-ocean" />
        Patient Notes
      </h2>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 mb-2">{note.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-healing-ocean">{note.mood}</span>
              <span className="text-xs text-gray-500">
                {new Date(note.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}