import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function ConsultationRequests() {
  const requests = [
    {
      id: 1,
      name: "New Patient Request",
      date: "2024-03-29",
      status: "Pending",
      message: "Seeking help with childhood trauma and anxiety"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <MessageCircle className="w-5 h-5 mr-2 text-healing-ocean" />
        Consultation Requests
      </h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{request.name}</h3>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                {request.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{request.message}</p>
            <span className="text-xs text-gray-500">{request.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}