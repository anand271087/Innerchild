import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import UpdatePasswordPage from './components/auth/UpdatePasswordPage';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Footer from './components/layout/Footer';
import Hero from './Hero';
import IntroSection from './components/home/IntroSection';
import WhatIs from './components/WhatIs';
import Examples from './components/Examples';
import HealingCompass from './components/HealingCompass';
import SoulChat from './components/SoulChat';
import SoulChatPage from './components/SoulChat/SoulChatPage';
import AssessmentPage from './components/Assessment/AssessmentPage';
import MeditationJourney from './components/MeditationJourney';
import ResourcesPage from './components/pages/ResourcesPage';
import FAQ from './components/FAQ';
import BetaFeedback from './components/BetaFeedback';
import AuthModal from './components/auth/AuthModal';
import UnderConstructionPage from './components/UnderConstruction';
import RootCauseAnalysisPage from './components/journey/RootCauseAnalysisPage';
import { useAuthStore } from './store/authStore';
import { useAuthStateHandler } from './hooks/useAuthStateHandler';
import { useAuthModalHandler } from './hooks/useAuthModalHandler';
import { supabase, testSupabaseConnection } from './services/supabase';

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [returnPath, setReturnPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  useAuthStateHandler(setUser);
  useAuthModalHandler(setReturnPath, setAuthMode, setShowAuthModal);

  // Test Supabase connection on mount
  useEffect(() => {
    let mounted = true;

    const checkConnection = async () => {
      try {
        const isConnected = await testSupabaseConnection();
        if (!mounted) return;

        if (!isConnected) {
          setConnectionError('Unable to connect to the server. Please try again later.');
        }
      } catch (err) {
        if (!mounted) return;
        console.error('Connection test failed:', err);
        setConnectionError('Unable to connect to the server. Please try again later.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkConnection();

    return () => {
      mounted = false;
    };
  }, []);

  // Enhanced OAuth callback handling
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we're on the callback URL
        if (window.location.pathname === '/auth/callback') {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) throw error;
          
          if (session?.user) {
            setUser(session.user);
            
            // Get the return path from localStorage if it exists
            const returnPath = localStorage.getItem('authReturnPath');
            localStorage.removeItem('authReturnPath'); // Clean up
            
            // Redirect to the return path or home
            window.location.href = returnPath || '/';
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        // Redirect to login on error
        window.location.href = '/login?error=auth_callback_failed';
      }
    };

    handleAuthCallback();
  }, [setUser]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (returnPath) {
      window.location.href = returnPath;
      setReturnPath(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-healing-ocean mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (connectionError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-4">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-4">{connectionError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-2 bg-healing-ocean text-white rounded-lg hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <div className="min-h-screen flex flex-col bg-white">
                  <main className="flex-grow">
                    <Hero />
                    <IntroSection />
                    <SoulChat />
                    <WhatIs />
                    <Examples />
                    <HealingCompass />
                    <BetaFeedback />
                    <FAQ />
                  </main>
                </div>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/welcome" element={<UnderConstructionPage />} />
            <Route
              path="/meditation-journey"
              element={
                <PrivateRoute>
                  <MeditationJourney />
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
              path="/assessment"
              element={
                <PrivateRoute>
                  <AssessmentPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/root-cause-analysis"
              element={
                <PrivateRoute>
                  <RootCauseAnalysisPage />
                </PrivateRoute>
              }
            />
            {/* Add OAuth callback route */}
            <Route path="/auth/callback" element={<div>Authenticating...</div>} />
          </Routes>
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
    </Router>
  );
}