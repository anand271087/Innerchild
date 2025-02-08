import React from 'react';

export default function WhatIs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What is Inner Child Healing?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <img
            src="https://images.unsplash.com/photo-1543342384-1f1350e27861?auto=format&fit=crop&q=80&w=800"
            alt="Parent hugging child in nature"
            className="rounded-lg shadow-lg object-cover w-full h-[400px]"
          />
          <div className="space-y-6 text-gray-600 text-left">
            <p className="text-lg">
              Inner child healing is a therapeutic approach that addresses and heals wounds from our childhood experiences. It's based on the understanding that we all have a "child within" that carries our early memories, emotions, and learned behaviors.
            </p>
            <p>
              This healing journey involves:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Reconnecting with your childhood self</li>
              <li>Processing unresolved emotional wounds</li>
              <li>Understanding patterns and behaviors</li>
              <li>Developing self-compassion and nurturing practices</li>
              <li>Creating new, healthy emotional responses</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-[400px] rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/-WIsU6ANC1I?rel=0&modestbranding=1&origin=https://stackblitz.com"
              title="Understanding Inner Child Healing"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}