import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Heart, LogOut, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../services/supabase';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuthStore();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        try {
          const displayNameFromMeta = user.user_metadata?.display_name;
          if (displayNameFromMeta) {
            setDisplayName(displayNameFromMeta);
            return;
          }

          const { data, error } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('id', user.id)
            .single();

          if (!error && data) {
            setDisplayName(data.display_name);
          }
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      } else {
        setDisplayName(null);
      }
    };

    loadProfile();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const handleShowAuth = () => {
    window.dispatchEvent(new CustomEvent('showAuth', { 
      detail: { returnPath: window.location.pathname }
    }));
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-magical' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-black">
              <div className="flex items-center">
                <Heart className="w-6 h-6 text-healing-ocean mr-2" />
                InnerHeal
              </div>
            </a>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                  title={displayName || user.email}
                >
                  <User className="w-5 h-5 text-black group-hover:text-healing-ocean" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-sm truncate">{displayName || user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleShowAuth}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                title="Sign In"
              >
                <User className="w-5 h-5 text-black group-hover:text-healing-ocean" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}