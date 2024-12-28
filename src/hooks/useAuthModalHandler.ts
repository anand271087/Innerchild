import { useEffect } from 'react';

interface ShowAuthEvent extends CustomEvent {
  detail: { returnPath: string };
}

export function useAuthModalHandler(
  setReturnPath: (path: string) => void,
  setAuthMode: (mode: 'login' | 'signup') => void,
  setShowAuthModal: (show: boolean) => void
) {
  useEffect(() => {
    const handleShowAuth = (e: ShowAuthEvent) => {
      setReturnPath(e.detail.returnPath);
      setAuthMode('login');
      setShowAuthModal(true);
    };

    window.addEventListener('showAuth', handleShowAuth as EventListener);
    return () => window.removeEventListener('showAuth', handleShowAuth as EventListener);
  }, [setReturnPath, setAuthMode, setShowAuthModal]);
}