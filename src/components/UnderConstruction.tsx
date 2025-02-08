import React from 'react';
import { Clock, Home, ChevronRight } from 'lucide-react';

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Coming Soon</span>
        </nav>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center max-w-2xl mx-auto">
          <div className="relative mb-8">
            <Clock className="w-16 h-16 text-healing-ocean mx-auto animate-pulse" />
          </div>

          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-healing-ocean to-healing-secondary bg-clip-text text-transparent">
            Coming Soon!
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            We're working on something magical for your inner healing journey.
          </p>

          <div className="bg-healing-mint/20 rounded-lg p-6">
            <p className="text-healing-ocean font-medium">
              Launch Date: April 27th at 6:30 PM IST
            </p>
            <p className="text-gray-600 mt-2">
              Join us for the beginning of your transformative inner healing journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}