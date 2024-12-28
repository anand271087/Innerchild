import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <Mail className="w-6 h-6 text-healing-ocean mt-1" />
        <div className="ml-4">
          <h3 className="text-lg font-medium">Email</h3>
          <p className="mt-1">
            <a href="mailto:support@innerheal.com" className="text-gray-600 hover:text-healing-ocean">
              support@innerheal.com
            </a>
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Phone className="w-6 h-6 text-healing-ocean mt-1" />
        <div className="ml-4">
          <h3 className="text-lg font-medium">Phone</h3>
          <p className="mt-1">
            <a href="tel:+1-555-123-4567" className="text-gray-600 hover:text-healing-ocean">
              +1 (555) 123-4567
            </a>
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <MapPin className="w-6 h-6 text-healing-ocean mt-1" />
        <div className="ml-4">
          <h3 className="text-lg font-medium">Location</h3>
          <p className="mt-1 text-gray-600">
            123 Healing Street<br />
            Mindful City, MC 12345<br />
            United States
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Clock className="w-6 h-6 text-healing-ocean mt-1" />
        <div className="ml-4">
          <h3 className="text-lg font-medium">Hours</h3>
          <p className="mt-1 text-gray-600">
            Monday - Friday: 9:00 AM - 6:00 PM<br />
            Saturday: 10:00 AM - 4:00 PM<br />
            Sunday: Closed
          </p>
        </div>
      </div>
    </div>
  );
}