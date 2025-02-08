import React, { useState } from 'react';
import { Trophy, Video } from 'lucide-react';

export default function CelebrationSection() {
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateVideo = () => {
    setIsGenerating(true);
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Trophy className="w-6 h-6 mr-2 text-healing-ocean" />
        My Celebration
      </h2>

      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Write your celebratory message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 rounded-lg border-gray-300 focus:border-healing-ocean focus:ring-healing-ocean"
            placeholder="Share what you're celebrating today..."
          />
        </div>

        <button
          onClick={handleGenerateVideo}
          disabled={!message.trim() || isGenerating}
          className="w-full flex items-center justify-center px-6 py-3 bg-healing-ocean text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Video className="w-5 h-5 mr-2" />
          {isGenerating ? 'Generating Video...' : 'Generate 1-Minute Celebration Video'}
        </button>

        {isGenerating && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Creating your special moment... This will take about a minute.
          </div>
        )}
      </div>
    </div>
  );
}