import React from 'react';
import { FileText } from 'lucide-react';

export default function ClientNotes() {
  const notes = [
    {
      id: 1,
      patientName: "Subash",
      date: "2024-03-28",
      summary: "Made significant progress in addressing childhood trauma. Shows improved emotional regulation.",
      tags: ["Progress", "Trauma Work"]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-healing-ocean" />
        Recent Client Notes
      </h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{note.patientName}</h3>
              <span className="text-sm text-gray-500">{note.date}</span>
            </div>
            <p className="text-gray-600 mb-3">{note.summary}</p>
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-healing-ocean/10 text-healing-ocean text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}