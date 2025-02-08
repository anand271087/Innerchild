import React, { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';
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
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-save when user stops typing for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value.trim()) {
        handleSave();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

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
      onSave();
      
      // Show success indicator briefly
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 1500);
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
        <div className="text-red-600 text-sm bg-red-50 p-2 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        {/* Voice input always shown at top */}
        <div className="flex justify-end">
          <VoiceInput
            triggerId={triggerId}
            stepId={stepId}
            journeyId={journeyId}
            onAudioChange={onAudioChange}
          />
        </div>

        {/* Text area with auto-save indicator */}
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your response here..."
            className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-healing-ocean focus:border-transparent"
          />
          
          {/* Auto-save indicator */}
          <div className="absolute bottom-2 right-2">
            {isSaving ? (
              <span className="text-sm text-gray-500">Saving...</span>
            ) : showSaveSuccess ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : value.trim() && (
              <Save className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}