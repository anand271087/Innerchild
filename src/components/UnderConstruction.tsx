import React from 'react';
import { Clock } from 'lucide-react';

export default function UnderConstruction() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <div className="max-w-2xl mx-auto">
        <Clock className="w-16 h-16 text-healing-ocean mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
        <p className="text-lg text-gray-600 mb-2">
          We're working on something special for you.
        </p>
        <p className="text-healing-ocean font-semibold">
          Check back on April 27th at 6:30 PM IST
        </p>
      </div>
    </div>
  );
}