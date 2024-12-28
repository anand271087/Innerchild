import React from 'react';
import { Heart } from 'lucide-react';
import { MemberAvatar } from './MemberAvatar';
import { ActionButton } from '../shared/ActionButton';
import { ProgressBar } from '../shared/ProgressBar';

export default function MentorshipCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="mb-4">
        <Heart className="w-6 h-6 text-healing-ocean" />
      </div>
      <h3 className="text-lg font-semibold mb-3">Peer Support & Mentorship</h3>
      <p className="text-gray-600 mb-4">Connect with experienced healers and supportive peers</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Available Mentors</span>
          <span className="text-healing-ocean font-medium">12</span>
        </div>
        <ProgressBar progress={75} />
        <p className="text-xs text-gray-500 mt-1">75% match rate with mentors</p>
      </div>

      <div className="flex -space-x-2 mb-4">
        <MemberAvatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop" />
        <MemberAvatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" />
        <MemberAvatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" />
        <MemberAvatar src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop" />
      </div>

      <ActionButton icon={<Heart className="w-4 h-4" />} label="Find a Mentor" />
    </div>
  );
}