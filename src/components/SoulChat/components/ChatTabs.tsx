import React from 'react';
import { Brain, Heart } from 'lucide-react';

interface ChatTabsProps {
  activeTab: 'analysis' | 'exercises';
  onTabChange: (tab: 'analysis' | 'exercises') => void;
}

export function ChatTabs({ activeTab, onTabChange }: ChatTabsProps) {
  return (
    <div className="flex space-x-4 mb-8">
      <button
        onClick={() => onTabChange('analysis')}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
          activeTab === 'analysis'
            ? 'bg-healing-ocean text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Brain className="w-5 h-5 mr-2" />
        Discover
      </button>
      <button
        onClick={() => onTabChange('exercises')}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
          activeTab === 'exercises'
            ? 'bg-healing-ocean text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Heart className="w-5 h-5 mr-2" />
        Heal
      </button>
    </div>
  );
}