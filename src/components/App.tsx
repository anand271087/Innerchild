import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Footer from './components/layout/Footer';
import Hero from './components/Hero';
import IntroSection from './components/home/IntroSection';
import WhatIs from './components/WhatIs';
import Examples from './components/Examples';
import HealingCompass from './components/HealingCompass';
import Survey from './components/Survey';
import SoulChat from './components/SoulChat';
import SoulChatPage from './components/SoulChat/SoulChatPage';
import AssessmentPage from './components/Assessment/AssessmentPage';
import Meditation from './components/Meditation';
import MeditationJourney from './components/MeditationJourney';
import EnergySpacesLive from './components/EnergySpacesLive';
import AILifeStory from './components/AILifeStory';
import Resources from './components/Resources';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AuthModal from './components/auth/AuthModal';
import { useAuthStore } from './store/authStore';
import { useAuthStateHandler } from './hooks/useAuthStateHandler';
import { useAuthModalHandler } from './hooks/useAuthModalHandler';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [returnPath, setReturnPath] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  useAuthStateHandler(setUser);
  useAuthModalHandler(setReturnPath, setAuthMode, setShowAuthModal);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (returnPath) {
      window.location.href = returnPath;
      setReturnPath(null);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush">
              <Navigation />
              <main className="flex-grow">
                <Hero />
                <IntroSection />
                <WhatIs />
                <Examples />
                <HealingCompass />
                <Survey />
                <SoulChat />
                <Meditation />
                <EnergySpacesLive />
                <AILifeStory />
                <Resources />
                <FAQ />
                <Testimonials />
                <Contact />
              </main>
              <Footer />
              <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                mode={authMode}
                onSwitchMode={() => setAuthMode(mode => mode === 'login' ? 'signup' : 'login')}
                onSuccess={handleAuthSuccess}
              />
            </div>
          }
        />

        {/* Rest of the routes remain unchanged */}
      </Routes>
    </Router>
  );
}

export default App;