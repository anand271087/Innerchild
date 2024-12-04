import React from 'react';
import { Mic, Square, Trash2 } from 'lucide-react';
import { useVoiceJournal } from '../hooks/useVoiceJournal';

interface VoiceJournalProps {
  userId: number;
  dayNumber: number;
}

export default function VoiceJournal({ userId, dayNumber }: VoiceJournalProps) {
  const {
    isRecording,
    audioURL,
    error,
    startRecording,
    stopRecording,
    deleteRecording
  } = useVoiceJournal({ userId, dayNumber });

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">🎙️ Voice Journal</h3>
      <p className="mb-4 text-gray-600">
        Record your thoughts and feelings verbally. Sometimes speaking our thoughts can bring new insights.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {!audioURL ? (
          <div className="flex justify-center">
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Recording
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90"
              >
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <audio controls className="w-full">
              <source src={audioURL} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
            <div className="flex justify-center">
              <button
                onClick={deleteRecording}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Recording
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}