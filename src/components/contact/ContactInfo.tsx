import React from 'react';
import { Mail } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <Mail className="w-6 h-6 text-healing-ocean mt-1" />
        <div className="ml-4">
          <h3 className="text-lg font-medium">Email</h3>
          <p className="mt-1">
            <a href="mailto:support@innerheal.in" className="text-gray-600 hover:text-healing-ocean">
              support@innerheal.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}