import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, MessageCircle, Video, Clock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useJourneyHistory } from '../hooks/useJourneyHistory';

export default function QuickAccess() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { journeyHistory } = useJourneyHistory();

  if (!user) return null;

  const lastSoulChat = journeyHistory[0];
  const hasInProgressVideo = false; // This would come from your video progress tracking
  const lastMeditationDay = localStorage.getItem(`last-meditation-day-${user.id}`);

  if (!lastSoulChat && !hasInProgressVideo && !lastMeditationDay) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-healing-mint/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Continue Your Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lastSoulChat && (
              <button
                onClick={() => navigate('/soul-chat')}
                className="bg-white rounded-lg p-6 text-left hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <MessageCircle className="w-8 h-8 text-healing-ocean" />
                  <span className="text-sm text-gray-500">
                    {new Date(lastSoulChat.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">Continue Soul Chat</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {lastSoulChat.prompt}
                </p>
                <div className="flex items-center text-healing-ocean group-hover:gap-2 transition-all">
                  <span className="text-sm">Continue Chat</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            )}

            {hasInProgressVideo && (
              <button
                onClick={() => navigate('/ai-life-story')}
                className="bg-white rounded-lg p-6 text-left hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Video className="w-8 h-8 text-healing-ocean" />
                  <span className="text-sm text-gray-500">50% complete</span>
                </div>
                <h3 className="font-semibold mb-2">Complete Your Story</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Continue creating your healing journey video
                </p>
                <div className="flex items-center text-healing-ocean group-hover:gap-2 transition-all">
                  <span className="text-sm">Resume Video</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            )}

            {lastMeditationDay && (
              <button
                onClick={() => navigate('/meditation-journey')}
                className="bg-white rounded-lg p-6 text-left hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-healing-ocean" />
                  <div className="flex items-center text-sm text-gray-500">
                    <Play className="w-4 h-4 mr-1" />
                    Day {lastMeditationDay}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Continue Meditation</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Resume your 48-day healing journey
                </p>
                <div className="flex items-center text-healing-ocean group-hover:gap-2 transition-all">
                  <span className="text-sm">Continue Journey</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}