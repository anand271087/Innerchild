import React from 'react';
import { ArrowRight, Heart, Brain, MessageCircle, Play, Home, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleNavigation = (href: string) => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('showAuth', { 
        detail: { returnPath: href.replace('#', '') }
      }));
      return;
    }
    navigate(href.replace('#', '/'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      {/* Rest of the component remains the same */}
    </div>
  );
}