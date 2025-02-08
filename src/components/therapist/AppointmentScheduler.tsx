import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function AppointmentScheduler() {
  const appointments = [
    {
      id: 1,
      patientName: "Subash",
      date: "2024-03-30T10:00:00",
      duration: "50 min",
      type: "Individual Session"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-healing-ocean" />
        Upcoming Appointments
      </h2>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-medium">{appointment.patientName}</h3>
              <p className="text-sm text-gray-500">{appointment.type}</p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>
                {new Date(appointment.date).toLocaleTimeString()} ({appointment.duration})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}