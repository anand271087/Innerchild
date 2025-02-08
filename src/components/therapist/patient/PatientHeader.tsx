import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface PatientHeaderProps {
  patientId?: string;
}

export default function PatientHeader({ patientId }: PatientHeaderProps) {
  const patient = {
    name: "Subash",
    age: 28,
    startDate: "2024-01-15",
    nextSession: "2024-03-30T10:00:00",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img
            src={patient.image}
            alt={patient.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <p className="text-gray-600">Age: {patient.age}</p>
            <p className="text-sm text-gray-500">
              Started therapy: {new Date(patient.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-600">Next Session</div>
            <div className="flex items-center text-healing-ocean">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{new Date(patient.nextSession).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{new Date(patient.nextSession).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}