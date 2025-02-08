import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import ResourcesNavigation from './resources/ResourcesNavigation';
import ResourcesContent from './resources/ResourcesContent';

export default function ResourcesPage() {
  const [activeSection, setActiveSection] = React.useState('reading');

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Resources</span>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <ResourcesNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
            <ResourcesContent activeSection={activeSection} />
          </div>
        </div>
      </div>
    </div>
  );
}