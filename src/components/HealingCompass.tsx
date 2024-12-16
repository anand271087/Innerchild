import React from 'react';
import { 
  Brain, 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  Users, 
  Library,
  ArrowRight
} from 'lucide-react';
import { FeatureCard } from './compass/FeatureCard';

export default function HealingCompass() {
  const features = [
    {
      title: "Inner Child Assessment",
      description: "Discover your unique inner child pattern and receive personalized healing recommendations",
      icon: <Brain className="w-6 h-6" />,
      color: "from-pink-500 to-purple-500",
      link: "/assessment"
    },
    {
      title: "48-Day Healing Journey",
      description: "Transform through daily guided meditations, journaling prompts, and reflection exercises",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      link: "/meditation-journey"
    },
    {
      title: "Soul Chat",
      description: "Real-time guidance for processing emotions and reframing thoughts with AI support",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      link: "/soul-chat"
    },
    {
      title: "AI Life Story Analysis",
      description: "Share your experiences, and our AI crafts a unique video of your journey",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      link: "/ai-life-story"
    },
    {
      title: "Energy Spaces Live",
      description: "Join live healing circles, cosmic events, and connect with mentors in real-time",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500",
      link: "/energy-spaces"
    },
    {
      title: "Healing Resources",
      description: "Access curated content, exercises, and tools for your healing journey",
      icon: <Library className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
      link: "/resources"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Healing Compass
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need for your inner child healing journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}