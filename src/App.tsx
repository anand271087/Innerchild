import React, { useEffect, useState } from 'react';
import { Menu, X, Heart, BookOpen, Brain, MessageCircle, Library } from 'lucide-react';
import Hero from './components/Hero';
import WhatIs from './components/WhatIs';
import Examples from './components/Examples';
import Meditation from './components/Meditation';
import MeditationJourney from './components/MeditationJourney';
import AILifeStory from './components/AILifeStory';
import Survey from './components/Survey';
import Resources from './components/Resources';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import SoulChat from './components/SoulChat';
import AssessmentPage from './components/Assessment/AssessmentPage';
import SoulChatPage from './components/SoulChat/SoulChatPage';
import WelcomePage from './components/WelcomePage';

function App() {
  const [showJourney, setShowJourney] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showSoulChat, setShowSoulChat] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: '48-Day Healing', href: '#meditation', icon: <Heart className="w-5 h-5" /> },
    { name: 'AI Life Story', href: '#ai-life-story', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Inner Child Survey', href: '#inner-child-survey', icon: <Brain className="w-5 h-5" /> },
    { name: 'Soul Chat', href: '#soul-chat', icon: <MessageCircle className="w-5 h-5" /> },
    { name: 'Resources', href: '#resources', icon: <Library className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setShowJourney(hash === '#meditation-journey');
      setShowAssessment(hash === '#assessment');
      setShowSoulChat(hash === '#soul-chat-page');
      setShowWelcome(hash === '#welcome');
    };

    // Check hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (showWelcome) {
    return <WelcomePage />;
  }

  if (showJourney) {
    return <MeditationJourney />;
  }

  if (showAssessment) {
    return <AssessmentPage />;
  }

  if (showSoulChat) {
    return <SoulChatPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush">
      <header className="bg-healing-dark/95 backdrop-blur-sm shadow-magical fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-healing-light">InnerHeal</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 text-healing-light hover:text-white transition-colors duration-200"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ))}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-healing-light hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-healing-dark/95 backdrop-blur-sm">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-healing-light hover:text-white hover:bg-healing-secondary/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <Hero />
        <WhatIs />
        <Examples />
        <Meditation setShowJourney={setShowJourney} />
        <AILifeStory />
        <Survey />
        <SoulChat />
        <Resources />
        <FAQ />
        <Testimonials />
      </main>
      <footer className="bg-healing-ocean text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">© {new Date().getFullYear()} InnerHeal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;