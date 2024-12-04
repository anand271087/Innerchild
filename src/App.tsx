import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
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
import AuthModal from './components/auth/AuthModal';
import { useAuthStore } from './store/authStore';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [returnPath, setReturnPath] = useState<string | null>(null);

  useEffect(() => {
    const handleShowAuth = (e: CustomEvent<{ returnPath: string }>) => {
      setReturnPath(e.detail.returnPath);
      setAuthMode('login');
      setShowAuthModal(true);
    };

    window.addEventListener('showAuth', handleShowAuth as EventListener);
    return () => window.removeEventListener('showAuth', handleShowAuth as EventListener);
  }, []);

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
            <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush">
              <Navigation />
              <Hero />
              <WhatIs />
              <Examples />
              <Meditation setShowJourney={() => {}} />
              <AILifeStory />
              <Survey />
              <SoulChat />
              <Resources />
              <FAQ />
              <Testimonials />
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

        <Route
          path="/meditation-journey"
          element={
            <PrivateRoute>
              <MeditationJourney />
            </PrivateRoute>
          }
        />

        <Route
          path="/assessment"
          element={
            <PrivateRoute>
              <AssessmentPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/soul-chat"
          element={
            <PrivateRoute>
              <SoulChatPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/welcome"
          element={
            <PrivateRoute>
              <WelcomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;