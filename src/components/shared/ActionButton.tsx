import React, { ReactNode } from 'react';

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-4 bg-healing-ocean text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
}