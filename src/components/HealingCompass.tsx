import React from 'react';
import { 
  Brain, 
  Calendar, 
  BookOpen, 
  Users, 
  Library
} from 'lucide-react';

export default function HealingCompass() {
  const features = [
    {
      title: "Inner Child Assessment",
      description: "Discover your unique inner child pattern through our comprehensive assessment. Get personalized insights and healing recommendations tailored to your journey.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "48-Day Healing Journey",
      description: "Transform through daily guided meditations, journaling prompts, and reflection exercises. A structured path to deep emotional healing and self-discovery.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "AI Life Story Analysis",
      description: "Share your experiences and receive profound insights through AI-powered analysis. Uncover patterns, understand triggers, and find paths to healing.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Energy Spaces Live",
      description: "Join live healing circles, cosmic events, and connect with mentors in real-time. Experience the power of collective healing and shared wisdom.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Healing Resources",
      description: "Access our curated library of healing tools, exercises, meditations, and educational content. Everything you need to support your inner healing journey.",
      icon: <Library className="w-6 h-6" />
    }
  ];

  return (
    <section id="healing-compass" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Upcoming Features
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            More tools to support your healing journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-magical p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-healing-mint to-healing-lavender opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-healing-ocean/10 text-healing-ocean flex items-center justify-center mb-4">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-healing-ocean transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                <div className="inline-flex items-center px-3 py-1 bg-healing-ocean/10 text-healing-ocean text-sm font-medium rounded-full">
                  Coming Soon
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}