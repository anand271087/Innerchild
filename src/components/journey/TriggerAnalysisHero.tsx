import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Search, RefreshCcw, Shield, Play, Pause } from 'lucide-react';
import { useState } from 'react';

const steps = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Identify Your Earliest Memory"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Recognize Your Current Triggers"
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Examine Your Coping Patterns"
  },
  {
    icon: <RefreshCcw className="w-6 h-6" />,
    title: "Reframe the Narrative"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Create Your Safety Plan"
  }
];

export default function TriggerAnalysisHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('/Dear Inner Me.mp3'));

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle audio ending
  React.useEffect(() => {
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [audio]);

  return (
    <div className="bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush p-8 rounded-xl mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Your 5 Step Root Cause Analysis
      </h2>

      {/* Meditation Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={togglePlay}
            className="w-full sm:w-auto flex items-center justify-center sm:justify-start space-x-3 sm:space-x-0 px-4 py-3 sm:p-0 bg-healing-ocean sm:bg-transparent text-white sm:text-healing-ocean rounded-lg sm:rounded-none hover:bg-opacity-90 sm:hover:bg-transparent transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-healing-ocean sm:bg-white flex items-center justify-center">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </div>
            <span className="font-medium sm:hidden">Play Meditation</span>
          </button>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-2">Dear Inner Me - Guided Meditation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              This meditation gently guides you into a calm, open state, allowing you to reconnect with your inner child and create a safe space for self-expression. By softening your mind and heart, it prepares you to journal freely, helping buried emotions and forgotten truths surface with ease.
            </p>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-healing-ocean/20 hidden md:block" />
        
        <div className="space-y-8 md:space-y-0 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="relative z-10 w-12 h-12 rounded-full bg-healing-ocean text-white flex items-center justify-center shadow-lg">
                {step.icon}
              </div>
              
              <div className={`flex-1 bg-white p-6 rounded-lg shadow-magical ${
                index % 2 === 0 ? 'md:text-right' : ''
              }`}>
                <h3 className="text-lg font-semibold text-healing-ocean">
                  {step.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}