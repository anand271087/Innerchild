import React from 'react';
import { Book, Video, Headphones, Star } from 'lucide-react';

interface ResourcesNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function ResourcesNavigation({ activeSection, onSectionChange }: ResourcesNavigationProps) {
  const sections = [
    { id: 'reading', label: 'Reading Materials', icon: <Book className="w-5 h-5" /> },
    { id: 'videos', label: 'Video Content', icon: <Video className="w-5 h-5" /> },
    { id: 'audio', label: 'Audio Resources', icon: <Headphones className="w-5 h-5" /> },
    { id: 'featured', label: 'Featured Content', icon: <Star className="w-5 h-5" /> }
  ];

  return (
    <nav className="lg:col-span-1 bg-gray-50 p-6">
      <h2 className="text-lg font-semibold mb-4">Resources</h2>
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === section.id
                ? 'bg-healing-ocean text-white'
                : 'text-gray-600 hover:bg-healing-ocean/10'
            }`}
          >
            {section.icon}
            <span>{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}