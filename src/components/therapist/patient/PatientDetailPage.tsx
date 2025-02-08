import React from 'react';
import { useParams } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import PatientHeader from './PatientHeader';
import HealingJourneyProgress from './HealingJourneyProgress';
import JournalSummary from './JournalSummary';
import MoodTracker from './mood/MoodTracker';
import PatientResources from './resources/PatientResources';
import TherapistNotes from './notes/TherapistNotes';
import PatientNotes from './notes/PatientNotes';

export default function PatientDetailPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-healing-ocean hover:text-healing-ocean/80">
            <Home className="w-4 h-4" />
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <a href="/therapist-room" className="text-healing-ocean hover:text-healing-ocean/80">
            Therapist Room
          </a>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Patient Details</span>
        </nav>

        <div className="space-y-8">
          <PatientHeader patientId={id} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HealingJourneyProgress patientId={id} />
            <JournalSummary patientId={id} />
          </div>
          <MoodTracker patientId={id} />
          <PatientResources patientId={id} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TherapistNotes patientId={id} />
            <PatientNotes patientId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}