import { useState, useEffect } from 'react';

interface UseVoiceJournalProps {
  userId: number;
  dayNumber: number;
  customKey?: string;
}

export function useVoiceJournal({ userId, dayNumber, customKey }: UseVoiceJournalProps) {
  const storageKey = customKey || `voice-journal-${userId}-${dayNumber}`;
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(() => {
    return localStorage.getItem(storageKey);
  });
  const [error, setError] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const saveRecording = (base64Audio: string) => {
    try {
      localStorage.setItem(storageKey, base64Audio);
      setAudioURL(base64Audio);
      window.dispatchEvent(new Event('journeyProgressUpdate'));
    } catch (err) {
      setError('Failed to save recording. Please try again.');
    }
  };

  const deleteRecording = () => {
    try {
      localStorage.removeItem(storageKey);
      setAudioURL(null);
      window.dispatchEvent(new Event('journeyProgressUpdate'));
    } catch (err) {
      setError('Failed to delete recording. Please try again.');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false
      });
      
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            saveRecording(reader.result);
          }
        };
        
        reader.readAsDataURL(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError('Failed to start recording. Please ensure microphone access is granted.');
      console.error('Recording error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder && isRecording) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaRecorder, isRecording]);

  return {
    isRecording,
    audioURL,
    error,
    startRecording,
    stopRecording,
    deleteRecording
  };
}