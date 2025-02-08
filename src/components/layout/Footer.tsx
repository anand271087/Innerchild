import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center">
          {/* Brand Section */}
          <Link to="/" className="flex items-center">
            <Heart className="w-8 h-8 text-healing-ocean" />
            <span className="ml-2 text-2xl font-bold">InnerHeal</span>
          </Link>
          <p className="mt-4 text-gray-600 max-w-sm text-center">
            Embark on a transformative journey of inner child healing, guided by expert support and innovative tools.
          </p>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center w-full">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} InnerHeal. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <Mail className="w-4 h-4 text-healing-ocean mr-2" />
              <a href="mailto:support@innerheal.in" className="text-sm text-gray-600 hover:text-healing-ocean">
                support@innerheal.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}