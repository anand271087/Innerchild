import React from 'react';
import { Calendar, Leaf, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Meditation() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const weeks = [
    { 
      title: "Week 1-2", 
      description: "Setting Intention, Releasing childhood and teenage experiences", 
      icon: <Leaf className="w-6 h-6" /> 
    },
    { 
      title: "Week 3-4", 
      description: "Young, Middle and Late Adulthood Experiences", 
      icon: <Moon className="w-6 h-6" /> 
    },
    { 
      title: "Week 5-6", 
      description: "Nothing is ever entirely good or bad", 
      icon: <Sun className="w-6 h-6" /> 
    },
    { 
      title: "Week 7", 
      description: "Cultivate Optimism and Hope", 
      icon: <Sun className="w-6 h-6" /> 
    }
  ];

  const handleJourneyClick = () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('showAuth', { 
        detail: { returnPath: '/meditation-journey' }
      }));
      return;
    }
    navigate('/meditation-journey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="meditation" className="py-16 bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            48-Day Guided Healing Journey
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Transform your relationship with your inner child through daily guided journalling & meditations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {weeks.map((week, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-healing-mint rounded-full mb-4 mx-auto">
                {week.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{week.title}</h3>
              <p className="text-gray-600 text-center">{week.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={handleJourneyClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Begin Your 48-Day Journey
          </button>
        </div>
      </div>
    </section>
  );
}