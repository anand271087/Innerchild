import React from 'react';
import { Play, Clock } from 'lucide-react';

export default function VideoContent() {
  const videos = [
    {
      title: "Introduction to Inner Child Work",
      thumbnail: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
      duration: "15:30",
      description: "Learn the basics of connecting with and healing your inner child"
    },
    {
      title: "Guided Inner Child Meditation",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
      duration: "20:45",
      description: "A gentle meditation to connect with your younger self"
    },
    {
      title: "Healing Childhood Wounds",
      thumbnail: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=600",
      duration: "25:15",
      description: "Expert techniques for processing and healing past experiences"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Video Content</h2>
      <div className="grid gap-6">
        {videos.map((video, index) => (
          <div key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="p-3 bg-white rounded-full">
                  <Play className="w-6 h-6 text-healing-ocean" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}