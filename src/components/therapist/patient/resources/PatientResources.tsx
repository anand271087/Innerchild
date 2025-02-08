import React, { useState } from 'react';
import { Book, Video, FileText, Plus, X } from 'lucide-react';
import ResourceCard from './ResourceCard';
import AddResourceModal from './AddResourceModal';

interface PatientResourcesProps {
  patientId?: string;
}

export default function PatientResources({ patientId }: PatientResourcesProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const resources = [
    {
      id: 1,
      type: 'exercise',
      title: 'Inner Child Healing Exercise',
      description: 'A guided exercise for connecting with your inner child',
      date: '2024-03-28',
      icon: <Book className="w-5 h-5" />
    },
    {
      id: 2,
      type: 'video',
      title: 'Understanding Emotional Patterns',
      description: 'Video guide on recognizing and transforming emotional patterns',
      date: '2024-03-27',
      icon: <Video className="w-5 h-5" />
    },
    {
      id: 3,
      type: 'worksheet',
      title: 'Self-Reflection Worksheet',
      description: 'Weekly self-reflection and progress tracking worksheet',
      date: '2024-03-26',
      icon: <FileText className="w-5 h-5" />
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Shared Resources</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-healing-ocean text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {showAddModal && (
        <AddResourceModal onClose={() => setShowAddModal(false)} patientId={patientId} />
      )}
    </div>
  );
}