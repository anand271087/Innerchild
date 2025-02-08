import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Home, ChevronRight, Sparkles, Heart, Star, Moon, Waves, Shell, Fish, Compass } from 'lucide-react';

export default function UnderConstructionPage() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const journeySteps = [
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Begin with Assessment",
      description: "Take the inner child assessment to understand your unique patterns",
      path: "/assessment"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Explore Resources",
      description: "Dive into our Resources section for foundational knowledge",
      path: "/resources"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Connect with Soul Chat",
      description: "Use Soul Chat for deep dive analysis when you need guidance",
      path: "/soul-chat"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Celebrate Progress",
      description: "Create your personalized journey video to mark milestones",
      path: "/ai-life-story"
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: "48-Day Journey",
      description: "Commit to the complete healing journey for lasting transformation",
      path: "/meditation-journey"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Start Your Magical Journey</span>
        </nav>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
          {/* Animated ocean waves background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 animate-ocean-wave">
              <Waves className="w-full h-full text-healing-ocean" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative mb-8">
              <Clock className="w-16 h-16 text-healing-ocean mx-auto animate-pulse" />
              <Shell className="w-8 h-8 text-healing-ocean absolute -top-2 right-1/3 animate-bounce" />
              <Fish className="w-6 h-6 text-healing-ocean absolute bottom-0 left-1/3 animate-pulse" />
            </div>

            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-healing-ocean to-healing-secondary bg-clip-text text-transparent">
              Your Magical Journey Awaits
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Embark on a transformative voyage of self-discovery and inner child healing
            </p>

            <div className="bg-healing-mint/20 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-6">Your Journey Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {journeySteps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation(step.path)}
                    className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full text-left"
                  >
                    <div className="text-healing-ocean">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
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
    </div>
  );
}