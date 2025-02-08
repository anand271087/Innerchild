import { useState, useEffect } from 'react';
import { get, set, del } from 'idb-keyval';

interface UseVoiceJournalProps {
  userId: string;
  dayNumber: number;
  customKey?: string;
}

export function useVoiceJournal({ userId, dayNumber, customKey }: UseVoiceJournalProps) {
  const storageKey = customKey || `voice-journal-${userId}-${dayNumber}`;
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  // Load cached audio on mount
  useEffect(() => {
    const loadCachedAudio = async () => {
      try {
        const cachedAudio = await get(`audio_${storageKey}`);
        if (cachedAudio) {
          setAudioURL(cachedAudio);
        }
      } catch (err) {
        console.error('Failed to load cached audio:', err);
      }
    };

    loadCachedAudio();
  }, [storageKey]);

  const cacheAudio = async (audioUrl: string) => {
    try {
      // Cache the audio URL in IndexedDB
      await set(`audio_${storageKey}`, audioUrl);
      
      // If it's a Supabase URL, cache the audio data
      if (audioUrl.includes('supabase')) {
        const response = await fetch(audioUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        // Store as generic audio/webm to ensure compatibility
        const audioBlob = new Blob([blob], { type: 'audio/webm' });
        await set(`audio_data_${storageKey}`, audioBlob);
      }
    } catch (err) {
      console.error('Failed to cache audio:', err);
      throw err;
    }
  };

  const clearCache = async () => {
    try {
      await del(`audio_${storageKey}`);
      await del(`audio_data_${storageKey}`);
    } catch (err) {
      console.error('Failed to clear audio cache:', err);
    }
  };

  const saveRecording = async (base64Audio: string) => {
    try {
      await cacheAudio(base64Audio);
      setAudioURL(base64Audio);
    } catch (err) {
      setError('Failed to save recording. Please try again.');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false
      });
      
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
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

  const deleteRecording = async () => {
    await clearCache();
    setAudioURL(null);
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
    deleteRecording,
    setAudioURL,
    cacheAudio
  };
}