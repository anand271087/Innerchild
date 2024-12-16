import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface ScenarioProps {
  name: string;
  description: string;
  rootCause: string;
  impact: string;
  image: string;
}

export function ScenarioCard({ name, description, rootCause, impact, image }: ScenarioProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transform hover:shadow-lg transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={`${name}'s story`} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-healing-ocean mt-1 flex-shrink-0" />
        <div className="space-y-1">
          <div>
            <span className="font-medium text-healing-ocean">{name}</span>
            <span className="text-gray-700"> {description}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-dashed border-gray-200">
        <div className="p-4 bg-healing-mint/10">
          <div className="flex items-center text-sm text-healing-ocean mb-2">
            <ArrowRight className="w-4 h-4 mr-1" />
            <span className="font-medium">Root Cause:</span>
          </div>
          <p className="text-gray-600 text-sm mb-3">{rootCause}</p>
          
          <div className="flex items-center text-sm text-healing-ocean mb-2">
            <ArrowRight className="w-4 h-4 mr-1" />
            <span className="font-medium">Present Impact:</span>
          </div>
          <p className="text-gray-600 text-sm">{impact}</p>
        </div>
      </div>
    </div>
  );
}