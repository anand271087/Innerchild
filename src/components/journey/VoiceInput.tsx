import React from 'react';
import { Mic, Square, Trash2 } from 'lucide-react';
import { useVoiceJournal } from '../../hooks/useVoiceJournal';

interface VoiceInputProps {
  triggerId: number;
  stepId: number;
  onAudioChange?: (audioUrl: string | null) => void;
}

export default function VoiceInput({ triggerId, stepId, onAudioChange }: VoiceInputProps) {
  const {
    isRecording,
    audioURL,
    error,
    startRecording,
    stopRecording,
    deleteRecording
  } = useVoiceJournal({
    userId: 1,
    dayNumber: 1,
    customKey: `trigger-${triggerId}-step-${stepId}-voice`
  });

  React.useEffect(() => {
    onAudioChange?.(audioURL);
  }, [audioURL, onAudioChange]);

  return (
    <div className="flex justify-end space-x-2">
      {!audioURL ? (
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${
            isRecording
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-healing-ocean text-white hover:bg-opacity-90'
          }`}
        >
          {isRecording ? (
            <>
              <Square className="w-4 h-4 mr-1" />
              Stop
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-1" />
              Record
            </>
          )}
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <audio controls className="h-8">
            <source src={audioURL} type="audio/webm" />
          </audio>
          <button
            onClick={deleteRecording}
            className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}