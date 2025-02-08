import React from 'react';
import { BookOpen, Brain, Sparkles, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function AILifeStory() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleStartVideo = () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('showAuth', { 
        detail: { returnPath: '/my-journey' }
      }));
      return;
    }
    navigate('/my-journey');
  };

  return (
    <section id="ai-life-story" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              AI-Generated Life Story Analysis
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our advanced AI analyzes your life experiences to uncover patterns and provide personalized healing insights.
            </p>
            <div className="mt-8 space-y-6">
              {[
                { icon: <Brain className="w-6 h-6" />, title: "Personalized Life Story Analysis", description: "Share your experiences, and our AI crafts a unique analysis of your journey." },
                { icon: <Sparkles className="w-6 h-6" />, title: "Deep Self-Understanding", description: "Uncover patterns in your life to better understand yourself." },
                { icon: <BookOpen className="w-6 h-6" />, title: "Inspiration for Growth", description: "Use these insights to inspire personal development and healing." },
                { icon: <BookOpen className="w-6 h-6" />, title: "Easy and Accessible", description: "Simply tell your story; our AI handles the rest." }
              ].map((feature, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-500 text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button 
                onClick={handleStartVideo}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90 transition-colors"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Your Journey
              </button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 space-y-8">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80"
                alt="AI Story Analysis"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white text-lg font-medium">
                    Transform your story into a meaningful journey of self-discovery
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-8 shadow-lg">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-gray-600">Based on your story, we've identified patterns of...</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-gray-600">Your emotional responses suggest...</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-gray-600">Recommended healing focus areas...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}