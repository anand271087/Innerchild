import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export default function FeaturedContent() {
  const featured = [
    {
      title: "Complete Inner Child Healing Guide",
      type: "Course",
      description: "A comprehensive program combining reading materials, videos, and exercises",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Healing Through Art Therapy",
      type: "Workshop Series",
      description: "Express and heal through creative exercises and guided sessions",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Featured Content</h2>
      <div className="grid gap-6">
        {featured.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center space-x-2 text-healing-ocean mb-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-sm font-medium">{item.type}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="flex items-center text-healing-ocean hover:underline">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}