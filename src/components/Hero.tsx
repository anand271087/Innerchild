import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleJourneyClick = () => {
    navigate('/welcome');
  };

  useEffect(() => {
    const createStar = () => {
      if (!containerRef.current) return;
      
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.animationDuration = `${2 + Math.random() * 2}s`;
      
      containerRef.current.appendChild(star);
      
      setTimeout(() => {
        star.remove();
      }, 5000);
    };

    const interval = setInterval(createStar, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-[#0A0A0A] min-h-screen flex items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900 opacity-80"></div>
      
      {/* Background image with leaves */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-soft-light"></div>
      
      {/* Glowing orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" style={{ top: '10%', left: '5%', opacity: 0.15 }}></div>
        <div className="absolute w-[32rem] h-[32rem] bg-pink-500 rounded-full filter blur-3xl" style={{ top: '20%', right: '10%', opacity: 0.15 }}></div>
        <div className="absolute w-80 h-80 bg-purple-400 rounded-full filter blur-3xl" style={{ bottom: '10%', left: '20%', opacity: 0.15 }}></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-8xl sm:text-9xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-purple-300 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
          InnerHeal
        </h1>

        <p className="text-3xl sm:text-4xl font-light mb-12 max-w-4xl mx-auto text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
          Your personal guide to rewriting the script of your life
        </p>

        <button
          onClick={handleJourneyClick}
          className="inline-flex items-center px-12 py-6 text-xl font-medium rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(219,39,119,0.3)] shadow-lg"
        >
          <Sparkles className="w-6 h-6 mr-3" />
          Begin Your Magical Journey
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
}