import React from 'react';
import { Download, Trash2 } from 'lucide-react';

interface ResourceCardProps {
  resource: {
    id: number;
    type: string;
    title: string;
    description: string;
    date: string;
    icon: React.ReactNode;
  };
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="text-healing-ocean">{resource.icon}</div>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
      <h3 className="font-medium mt-2">{resource.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
      <div className="text-xs text-gray-500 mt-2">
        Added: {new Date(resource.date).toLocaleDateString()}
      </div>
    </div>
  );
}