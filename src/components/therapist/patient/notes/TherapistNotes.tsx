import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';

interface TherapistNotesProps {
  patientId?: string;
}

export default function TherapistNotes({ patientId }: TherapistNotesProps) {
  const [newNote, setNewNote] = useState('');

  const notes = [
    {
      id: 1,
      content: "Patient shows significant progress in processing childhood trauma. Demonstrates improved emotional regulation.",
      date: "2024-03-28",
      tags: ["Progress", "Trauma Work"]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle note submission
    setNewNote('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-healing-ocean" />
        Therapist Notes
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          className="w-full rounded-lg border-gray-300 focus:border-healing-ocean focus:ring-healing-ocean"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-healing-ocean text-white rounded-lg hover:bg-opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 mb-2">{note.content}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-healing-ocean/10 text-healing-ocean text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(note.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}