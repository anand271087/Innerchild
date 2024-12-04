import React from 'react';
import { Save } from 'lucide-react';
import VoiceInput from './VoiceInput';

interface ResponseInputProps {
  triggerId: number;
  stepId: number;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onAudioChange?: (audioUrl: string | null) => void;
}

export default function ResponseInput({ 
  triggerId, 
  stepId, 
  value, 
  onChange,
  onSave,
  onAudioChange
}: ResponseInputProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your response here..."
          className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-healing-ocean focus:border-transparent"
        />
        <div className="absolute bottom-2 right-2">
          <VoiceInput 
            triggerId={triggerId} 
            stepId={stepId}
            onAudioChange={onAudioChange}
          />
        </div>
      </div>
      <button
        onClick={onSave}
        className="flex items-center px-4 py-2 text-sm text-healing-ocean hover:bg-healing-ocean/10 rounded-lg transition-colors"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Response
      </button>
    </div>
  );
}