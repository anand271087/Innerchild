import React from 'react';
import { MessageCircle, Sparkles, Heart, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FeatureSection } from './SoulChat/components/FeatureSection';

export default function SoulChat() {
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

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Practice Scenarios",
      description: "Work through common triggering situations with guided responses that help you develop healthier emotional patterns."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Compassionate Reframing",
      description: "Learn to transform critical self-talk into nurturing inner dialogue that supports your growth and healing."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Real-Time Support",
      description: "Get immediate guidance for processing emotions and reframing thoughts in a way that honors both your inner child and adult self."
    }
  ];

  return (
    <section id="soul-chat" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
                alt="People having meaningful conversation"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-healing-ocean text-white p-4 rounded-lg shadow-lg">
              <MessageCircle className="w-8 h-8" />
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
              Soul Chat: Your Inner Dialogue Companion
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Transform your inner dialogue through guided conversations that help you understand, 
              heal, and nurture your inner child. Soul Chat provides a safe space to explore your 
              thoughts and emotions with gentle guidance and powerful reframing techniques.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <FeatureSection key={index} {...feature} />
              ))}
            </div>

            <button 
              onClick={handleStartChat}
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Your Soul Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}