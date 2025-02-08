import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TriggerAnalysisHero from './TriggerAnalysisHero';

export default function RootCauseAnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link to="/soul-chat" className="text-healing-ocean hover:text-healing-ocean/80">
            Soul Chat
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">5 Step Root Cause Analysis</span>
        </nav>

        <TriggerAnalysisHero />
      </div>
    </div>
  );
}