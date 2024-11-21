import React from 'react';
import { ArrowRight, Heart, Brain, MessageCircle, Play, Home, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomePage() {
  const features = [
    {
      title: "48-Day Healing Journey",
      description: "Transform your relationship with your inner child through guided meditations and journaling.",
      icon: <Heart className="w-6 h-6" />,
      href: "#meditation-journey",
      color: "bg-pink-100 text-pink-600"
    },
    {
      title: "Inner Child Assessment",
      description: "Discover your inner child archetype and receive personalized healing recommendations.",
      icon: <Brain className="w-6 h-6" />,
      href: "#assessment",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Soul Chat",
      description: "Get support and guidance through our AI-powered chat companion.",
      icon: <MessageCircle className="w-6 h-6" />,
      href: "#soul-chat-page",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "AI Life Story",
      description: "Share your experiences and watch your journey unfold in a personalized video.",
      icon: <Play className="w-6 h-6" />,
      href: "#ai-life-story",
      color: "bg-blue-100 text-blue-600"
    }
  ];

  const examples = [
    {
      situation: "Avoiding Conflict at Work",
      insight: "This might stem from childhood experiences where expressing disagreement led to negative outcomes.",
      solution: "Learn healthy conflict resolution through our guided healing journey."
    },
    {
      situation: "Seeking Constant Validation",
      insight: "Could be linked to a childhood need for approval that wasn't fully met.",
      solution: "Develop self-trust through our meditation and journaling practices."
    },
    {
      situation: "Fear of Abandonment",
      insight: "Often rooted in early experiences of separation or inconsistent support.",
      solution: "Build secure attachment patterns with our Soul Chat guidance."
    }
  ];

  const handleNavigation = (href: string) => {
    window.location.hash = href.replace('#', '');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Welcome</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to InnerHeal: Your Journey to Self-Discovery Begins Here!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Embark on a transformative adventure to reconnect with your inner child and unlock personal growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <button
                  onClick={() => handleNavigation(feature.href)}
                  className="inline-flex items-center text-healing-ocean hover:text-healing-ocean/80"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Understanding Your Inner Child Through Real-Life Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-healing-mint/20 rounded-lg p-6"
              >
                <h3 className="font-semibold text-lg mb-2">{example.situation}</h3>
                <p className="text-gray-600 mb-4">{example.insight}</p>
                <p className="text-healing-ocean font-medium">{example.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-gray-600 mb-8">
            Choose any of the tools above to start your healing journey. Each one is designed to support 
            your growth in a unique way.
          </p>
          <button
            onClick={() => handleNavigation('#meditation-journey')}
            className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90 shadow-lg"
          >
            Start Your Healing Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}