import React from 'react';
import { Book, FileText, Headphones, Video, CheckCircle2 } from 'lucide-react';

export default function Resources() {
  const resources = [
    {
      icon: <Book className="w-6 h-6" />,
      title: "Reading Materials",
      items: ["Healing Your Inner Child", "The Power of Now", "Complex PTSD: From Surviving to Thriving"]
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Content",
      items: ["Guided Visualizations", "Expert Interviews", "Healing Techniques"]
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Audio Resources",
      items: ["Meditation Tracks", "Affirmations", "Therapeutic Music"]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Worksheets",
      items: ["Self-Reflection Exercises", "Journal Prompts", "Progress Tracking"]
    }
  ];

  return (
    <section id="resources" className="py-16 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Healing Resources
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Comprehensive tools and materials for your healing journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4 mx-auto">
                {resource.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">{resource.title}</h3>
              <ul className="space-y-2">
                {resource.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-600">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}