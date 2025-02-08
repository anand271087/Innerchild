import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import PatientList from './PatientList';
import AppointmentScheduler from './AppointmentScheduler';
import ClientNotes from './ClientNotes';
import GroupSessions from './GroupSessions';
import ConsultationRequests from './ConsultationRequests';

export default function TherapistRoomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Therapist Room</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PatientList />
            <div className="mt-8">
              <ConsultationRequests />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <AppointmentScheduler />
            <ClientNotes />
            <GroupSessions />
          </div>
        </div>
      </div>
    </div>
  );
}