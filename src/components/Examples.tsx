import React from 'react';

export default function Examples() {
  const examples = [
    {
      title: "Emotional Awareness",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Learn to identify and process childhood emotions that still influence your adult life."
    },
    {
      title: "Inner Dialogue",
      image: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Develop a compassionate inner voice to replace critical self-talk patterns."
    },
    {
      title: "Boundary Setting",
      image: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Establish healthy boundaries based on your authentic needs and values."
    }
  ];

  return (
    <section id="inner-child-benefits" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Benefits of Inner Child Healing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <img
                className="h-48 w-full object-cover"
                src={example.image}
                alt={example.title}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-600">
                  {example.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}