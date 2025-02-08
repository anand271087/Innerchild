import React from 'react';
import { Users } from 'lucide-react';

export default function GroupSessions() {
  const sessions = [
    {
      id: 1,
      title: "Inner Child Healing Circle",
      date: "2024-03-31T15:00:00",
      participants: 8,
      maxParticipants: 12
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Users className="w-5 h-5 mr-2 text-healing-ocean" />
        Group Sessions
      </h2>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{session.title}</h3>
              <span className="text-sm text-gray-500">
                {new Date(session.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {session.participants}/{session.maxParticipants} Participants
              </span>
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-healing-ocean rounded-full"
                  style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}