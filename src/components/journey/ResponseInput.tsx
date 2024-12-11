import React, { useState, useEffect } from 'react';
import { Save, Edit2, X } from 'lucide-react';
import VoiceInput from './VoiceInput';
import { saveJourneyResponse } from '../../services/supabase';

interface ResponseInputProps {
  triggerId: number;
  stepId: number;
  journeyId?: string;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onAudioChange?: (audioUrl: string | null) => void;
  isInitiallySaved?: boolean;
}

export default function ResponseInput({
  triggerId,
  stepId,
  journeyId,
  value,
  onChange,
  onSave,
  onAudioChange,
  isInitiallySaved = false
}: ResponseInputProps) {
  const [isEditing, setIsEditing] = useState(!isInitiallySaved);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsEditing(!isInitiallySaved);
  }, [isInitiallySaved]);

  const handleSave = async () => {
    if (!journeyId) {
      setError('Journey ID is required to save response');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await saveJourneyResponse(
        journeyId,
        `trigger-${triggerId}-step-${stepId}`,
        value
      );
      setIsEditing(false);
      onSave();
    } catch (err) {
      console.error('Failed to save response:', err);
      setError('Failed to save response. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-2 rounded-lg flex items-center">
          <X className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your response here..."
          disabled={!isEditing}
          className={`w-full h-32 p-3 border rounded-lg ${
            isEditing 
              ? 'focus:ring-2 focus:ring-healing-ocean focus:border-transparent' 
              : 'bg-gray-50 cursor-not-allowed'
          }`}
        />
        <div className="absolute bottom-2 right-2">
          <VoiceInput
            triggerId={triggerId}
            stepId={stepId}
            onAudioChange={onAudioChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 text-sm text-healing-ocean hover:bg-healing-ocean/10 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Response
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={isSaving || !value.trim()}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isSaving || !value.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-healing-ocean text-white hover:bg-opacity-90'
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Response'}
          </button>
        )}
      </div>
    </div>
  );
}