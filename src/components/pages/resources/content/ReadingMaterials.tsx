import React from 'react';
import { BookOpen, Download, ExternalLink } from 'lucide-react';

export default function ReadingMaterials() {
  const materials = [
    {
      title: "Understanding Your Inner Child",
      description: "A comprehensive guide to recognizing and healing childhood wounds",
      type: "E-Book",
      link: "#"
    },
    {
      title: "Healing Through Self-Compassion",
      description: "Learn techniques for developing a nurturing inner dialogue",
      type: "PDF Guide",
      link: "#"
    },
    {
      title: "Inner Child Journal Prompts",
      description: "30 days of guided journaling for inner child healing",
      type: "Workbook",
      link: "#"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reading Materials</h2>
      <div className="grid gap-6">
        {materials.map((material, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{material.title}</h3>
                <p className="text-gray-600 mb-4">{material.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>{material.type}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-healing-ocean hover:bg-healing-ocean/10 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 text-healing-ocean hover:bg-healing-ocean/10 rounded-lg transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}