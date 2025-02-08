import React, { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  link: string;
}

export function FeatureCard({ title, description, icon, color, link }: FeatureCardProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleClick = () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('showAuth', { 
        detail: { returnPath: link }
      }));
      return;
    }
    navigate(link);
  };

  return (
    <div 
      onClick={handleClick}
      className="group bg-white rounded-xl shadow-magical p-6 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <div className="relative">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center text-white mb-4`}>
          {icon}
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-healing-ocean transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {description}
        </p>

        <div className="flex items-center text-healing-ocean font-medium">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}