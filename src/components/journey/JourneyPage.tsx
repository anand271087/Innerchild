import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import MeditationSection from './sections/MeditationSection';
import AffirmationSection from './sections/AffirmationSection';
import RitualSection from './sections/RitualSection';
import CelebrationSection from './sections/CelebrationSection';

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">My Journey</span>
        </nav>

        <div className="space-y-8">
          <MeditationSection />
          <AffirmationSection />
          <RitualSection />
          <CelebrationSection />
        </div>
      </div>
    </div>
  );
}