import React from 'react';
import { X } from 'lucide-react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSwitchMode: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, mode, onSwitchMode, onSuccess }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6 z-10 m-4">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        {mode === 'login' ? (
          <LoginPage isModal onSwitchMode={onSwitchMode} onSuccess={onSuccess} />
        ) : (
          <SignupPage isModal onSwitchMode={onSwitchMode} onSuccess={onSuccess} />
        )}
      </div>
    </div>
  );
}