import React from 'react';
import { Users } from 'lucide-react';
import { MemberAvatar } from './MemberAvatar';
import { ActionButton } from '../shared/ActionButton';

export default function HealingCircleCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="mb-4">
        <Users className="w-6 h-6 text-healing-ocean" />
      </div>
      <h3 className="text-lg font-semibold mb-3">Personalized Healing Circles</h3>
      <p className="text-gray-600 mb-4">Join intimate groups of like-minded souls for deep healing work</p>
      
      <div className="mb-4">
        <div className="flex items-center text-green-500 text-sm mb-2">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          4 circles active now
        </div>
        <div className="flex -space-x-2">
          <MemberAvatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop" />
          <MemberAvatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" />
          <MemberAvatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" />
          <div className="w-8 h-8 rounded-full border-2 border-white bg-healing-ocean flex items-center justify-center text-white text-xs">+8</div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p className="font-medium">Next Circle:</p>
        <p className="text-healing-ocean">"Heart Chakra Healing"</p>
        <p>Starting in 15 minutes</p>
      </div>

      <ActionButton icon={<Users className="w-4 h-4" />} label="Join a Circle" />
    </div>
  );
}