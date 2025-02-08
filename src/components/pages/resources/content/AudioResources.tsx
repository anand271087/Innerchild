import React from 'react';
import { Play, Pause, Clock } from 'lucide-react';

export default function AudioResources() {
  const [playing, setPlaying] = React.useState<number | null>(null);

  const audios = [
    {
      title: "Morning Healing Meditation",
      duration: "10:00",
      description: "Start your day with this gentle healing meditation"
    },
    {
      title: "Inner Child Dialogue",
      duration: "15:20",
      description: "Guided practice for connecting with your inner child"
    },
    {
      title: "Evening Release Ritual",
      duration: "12:45",
      description: "Let go of the day's emotions with this soothing practice"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Audio Resources</h2>
      <div className="space-y-4">
        {audios.map((audio, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPlaying(playing === index ? null : index)}
                className="p-3 bg-healing-ocean rounded-full text-white hover:bg-opacity-90 transition-colors"
              >
                {playing === index ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <div className="flex-1">
                <h3 className="font-semibold">{audio.title}</h3>
                <p className="text-gray-600 text-sm">{audio.description}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {audio.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}