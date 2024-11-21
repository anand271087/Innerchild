import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  const handleJourneyClick = () => {
  window.location.hash = 'welcome';
  window.location.reload();
  };

  return (
  <div className="relative bg-fairy-gradient pt-20 pb-16 sm:pt-24 sm:pb-20">
    {/* Ensure this div does not overlap the button */}
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block mb-2">Begin Your Magical Journey</span>
          <span className="block text-healing-light">Inner Child Healing</span>
        </h1>
      </div>

      <div className="mt-20">
        <div className="text-center">
          <button
            onClick={handleJourneyClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Begin Your Magical Journey
          </button>
        </div>
      </div>
    </div>

    {/* Add this to ensure no overlapping */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
  </div>
  );
}