import React from 'react';
import { BookOpen } from 'lucide-react';

interface JournalSummaryProps {
  patientId?: string;
}

export default function JournalSummary({ patientId }: JournalSummaryProps) {
  const summary = {
    lastUpdated: "2024-03-28",
    keyThemes: [
      "Childhood Memories",
      "Family Relationships",
      "Self-Discovery"
    ],
    aiSummary: "Patient shows significant progress in processing childhood experiences. Notable improvements in emotional regulation and self-awareness. Recurring themes include family dynamics and self-acceptance. Recommended focus areas: continuing inner child dialogue and boundary setting exercises."
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <BookOpen className="w-5 h-5 mr-2 text-healing-ocean" />
        AI Journal Summary
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Key Themes</h3>
          <div className="flex flex-wrap gap-2">
            {summary.keyThemes.map((theme, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-healing-ocean/10 text-healing-ocean text-sm rounded-full"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Analysis</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {summary.aiSummary}
          </p>
        </div>

        <div className="text-xs text-gray-500">
          Last updated: {new Date(summary.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}