import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

export default function Hero() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleStartChat = () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('showAuth', { 
        detail: { returnPath: '/soul-chat' }
      }));
      return;
    }
    navigate('/soul-chat');
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-healing-ocean/20 rounded-full blur-3xl top-1/4 -left-12"></div>
        <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-healing-ocean/20 rounded-full blur-3xl bottom-1/4 -right-12"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-healing-ocean to-healing-secondary">
          InnerHeal
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl font-light mb-12 text-gray-800 max-w-3xl mx-auto leading-relaxed">
          The power to rewrite the script of your life
        </p>

        <button
          onClick={handleStartChat}
          className="inline-flex items-center px-6 py-4 sm:px-8 sm:py-5 text-lg sm:text-xl font-medium rounded-full bg-healing-ocean text-white hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
          Start your soul chat
        </button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}