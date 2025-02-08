import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PatientList() {
  const navigate = useNavigate();

  const patients = [
    {
      id: 1,
      name: "Subash",
      progress: 65,
      nextSession: "2024-03-30T10:00:00",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Users className="w-5 h-5 mr-2 text-healing-ocean" />
        Patients
      </h2>
      <div className="space-y-4">
        {patients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => navigate(`/patient/${patient.id}`)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <img
                src={patient.image}
                alt={patient.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-4 text-left">
                <h3 className="font-medium">{patient.name}</h3>
                <p className="text-sm text-gray-500">
                  Next Session: {new Date(patient.nextSession).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="text-sm font-medium text-healing-ocean">
                  {patient.progress}% Complete
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-healing-ocean rounded-full"
                    style={{ width: `${patient.progress}%` }}
                  />
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}