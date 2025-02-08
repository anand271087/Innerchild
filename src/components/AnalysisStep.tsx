import React, { useState, useEffect } from 'react';
import { Save, Mic, Square, Trash2 } from 'lucide-react';
import { useVoiceJournal } from '../hooks/useVoiceJournal';

interface AnalysisStepProps {
  stepNumber: number;
  stepContent: string;
  triggerId: string;
  onSave: (stepNumber: number, text: string) => void;
  savedText?: string;
}

export default function AnalysisStep({ 
  stepNumber, 
  stepContent, 
  triggerId,
  onSave,
  savedText = ''
}: AnalysisStepProps) {
  const [text, setText] = useState(savedText);
  const [isSaving, setIsSaving] = useState(false);

  const {
    isRecording,
    audioURL,
    error: voiceError,
    startRecording,
    stopRecording,
    deleteRecording
  } = useVoiceJournal({
    userId: 1, // Demo user
    dayNumber: stepNumber,
    customKey: `trigger-${triggerId}-step-${stepNumber}`
  });

  useEffect(() => {
    setText(savedText);
  }, [savedText]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      onSave(stepNumber, text);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save when user stops typing for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      if (text !== savedText) {
        handleSave();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="border-l-4 border-healing-ocean pl-4 mb-6">
      <div className="mb-4">
        <p className="text-gray-700 whitespace-pre-wrap">{stepContent}</p>
      </div>

      <div className="space-y-4">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-healing-ocean focus:border-transparent"
          />
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-transparent font-medium rounded text-healing-ocean hover:bg-healing-ocean/10 transition-colors"
            >
              <Save className="w-4 h-4 mr-1" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            {text !== savedText && (
              <span className="text-sm text-gray-500">Unsaved changes</span>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <h5 className="text-sm font-medium mb-2">Voice Note</h5>
          {voiceError && (
            <div className="mb-2 p-2 bg-red-50 text-red-600 rounded text-sm">
              {voiceError}
            </div>
          )}

          <div className="flex items-center space-x-4">
            {!audioURL ? (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`inline-flex items-center px-4 py-2 rounded text-sm font-medium ${
                  isRecording
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-healing-ocean text-white hover:bg-opacity-90'
                }`}
              >
                {isRecording ? (
                  <>
                    <Square className="w-4 h-4 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-2 w-full">
                <audio controls className="w-full">
                  <source src={audioURL} type="audio/webm" />
                  Your browser does not support the audio element.
                </audio>
                <button
                  onClick={deleteRecording}
                  className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete Recording
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}