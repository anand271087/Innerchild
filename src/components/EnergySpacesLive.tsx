import React from 'react';
import HealingCircleCard from './energy/HealingCircleCard';
import CosmicEventCard from './energy/CosmicEventCard';
import MentorshipCard from './energy/MentorshipCard';
import ExpertGuidanceCard from './energy/ExpertGuidanceCard';

export default function EnergySpacesLive() {
  return (
    <section className="py-16 bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Energy Spaces Live
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Join our vibrant community for real-time healing experiences and transformative connections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HealingCircleCard />
          <CosmicEventCard />
          <MentorshipCard />
          <ExpertGuidanceCard />
        </div>
      </div>
    </section>
  );
}