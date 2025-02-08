import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-healing-ocean h-2 rounded-full" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}