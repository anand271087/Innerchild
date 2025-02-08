import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Trash2, Loader2 } from 'lucide-react';
import { useVoiceJournal } from '../../hooks/useVoiceJournal';
import { supabase } from '../../services/supabase';
import { useAuthStore } from '../../store/authStore';

interface VoiceInputProps {
  triggerId: number;
  stepId: number;
  journeyId?: string;
  onAudioChange?: (audioUrl: string | null) => void;
  disabled?: boolean;
}

export default function VoiceInput({ 
  triggerId, 
  stepId,
  journeyId,
  onAudioChange,
  disabled = false 
}: VoiceInputProps) {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [audioSource, setAudioSource] = useState<'local' | 'supabase' | null>(null);
  const [existingRecording, setExistingRecording] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const {
    isRecording,
    audioURL,
    error,
    startRecording,
    stopRecording,
    deleteRecording,
    setAudioURL,
    cacheAudio
  } = useVoiceJournal({
    userId: user?.id || '',
    dayNumber: 1,
    customKey: `journey-${journeyId}-trigger-${triggerId}-step-${stepId}`
  });

  // Generate a consistent file name for the recording
  const getFileName = () => {
    if (!user || !journeyId) return null;
    return `${user.id}/journey-${journeyId}/trigger-${triggerId}/step-${stepId}.webm`;
  };

  // Modified function to get a direct download URL from Supabase
  const getSupabaseDownloadUrl = async (filePath: string) => {
    try {
      const { data } = await supabase.storage
        .from('voice-recordings')
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      if (data?.signedUrl) {
        return data.signedUrl;
      }
      throw new Error('Failed to get signed URL');
    } catch (err) {
      console.error('Error getting signed URL:', err);
      throw err;
    }
  };

  // Modified loadExistingRecording function
  const loadExistingRecording = async () => {
    if (!user || !journeyId) return;
    setIsLoading(true);
    setAudioError(null);

    const fileName = getFileName();
    if (!fileName) return;

    try {
      const { data: fileList } = await supabase.storage
        .from('voice-recordings')
        .list(user.id + '/journey-' + journeyId + '/trigger-' + triggerId);

      const existingFile = fileList?.find(file => 
        file.name === `step-${stepId}.webm`
      );

      if (existingFile) {
        const { data } = await supabase.storage
          .from('voice-recordings')
          .download(fileName);

        if (data) {
          const blobUrl = URL.createObjectURL(data);
          setExistingRecording(blobUrl);
          setAudioURL(blobUrl);
          setAudioSource('supabase');
          setIsAudioLoaded(true);
          onAudioChange?.(blobUrl);
        }
      }
    } catch (err) {
      console.error('Error loading existing recording:', err);
      setAudioError('Error loading audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle audio element reload on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && audioRef.current) {
        audioRef.current.load();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Add new function to get correct MIME type
  const getAudioMimeType = (url: string) => {
    if (url.includes('supabase')) {
      return 'audio/webm';
    }
    return 'audio/webm;codecs=opus';
  };

  // Add audio element event handlers
  const handleAudioLoad = () => {
    setIsAudioLoaded(true);
    setAudioError(null);
  };

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    console.error('Audio playback error:', e);
    setAudioError('Error playing audio. Please try again.');
    setIsAudioLoaded(false);
  };

  // Load existing recording on mount
  useEffect(() => {
    loadExistingRecording();
    return () => {
      // Cleanup blob URLs
      if (existingRecording?.startsWith('blob:')) {
        URL.revokeObjectURL(existingRecording);
      }
    };
  }, [user, journeyId, triggerId, stepId]);

  // Function to upload the audio to Supabase Storage
  const uploadAudioToSupabase = async (file: Blob): Promise<string | null> => {
    if (!user || !journeyId) return null;

    const fileName = getFileName();
    if (!fileName) return null;

    try {
      await deleteFromSupabase();

      const audioBlob = new Blob([file], { type: 'audio/webm' });
      
      const { error: uploadError } = await supabase.storage
        .from('voice-recordings')
        .upload(fileName, audioBlob, {
          contentType: 'audio/webm',
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Error uploading audio:', uploadError.message);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('voice-recordings')
        .getPublicUrl(fileName);

      // Add timestamp to force browser to reload the audio
      const urlWithTimestamp = `${publicUrl}?t=${Date.now()}`;
      
      // Cache the uploaded audio
      await cacheAudio(urlWithTimestamp);
      
      setAudioSource('supabase');
      return urlWithTimestamp;
    } catch (err) {
      console.error('Unexpected error during upload:', err);
      return null;
    }
  };

  // Function to delete recording from Supabase
  const deleteFromSupabase = async () => {
    if (!user || !journeyId) return;

    try {
      const fileName = getFileName();
      if (!fileName) {
        throw new Error('Invalid file path');
      }

      const { error } = await supabase.storage
        .from('voice-recordings')
        .remove([fileName]);

      if (error && !error.message.includes('Object not found')) {
        console.error('Error deleting recording:', error);
        throw error;
      }
    } catch (err) {
      console.error('Error deleting from Supabase:', err);
      throw err;
    }
  };

  // Handle audio URL changes and upload to Supabase
  useEffect(() => {
    const handleAudioUpload = async () => {
      if (audioURL && audioURL.startsWith('data:')) {
        setIsLoading(true);
        setAudioSource('local');
        try {
          const response = await fetch(audioURL);
          const blob = await response.blob();
          const supabaseUrl = await uploadAudioToSupabase(blob);
          
          if (supabaseUrl) {
            // Force a new audio element creation
            const urlWithTimestamp = `${supabaseUrl}?t=${Date.now()}`;
            onAudioChange?.(urlWithTimestamp);
            if (audioRef.current) {
              audioRef.current.load();
            }
          }
        } catch (err) {
          console.error('Error processing audio:', err);
        } finally {
          setIsLoading(false);
        }
      } else if (!audioURL) {
        onAudioChange?.(null);
        setAudioSource(null);
      } else if (audioURL === existingRecording) {
        setAudioSource(audioURL.startsWith('blob:') ? 'local' : 'supabase');
      }
    };

    handleAudioUpload();
  }, [audioURL, onAudioChange, user, journeyId, triggerId, stepId, existingRecording]);

  // Handle recording deletion
  const handleDelete = async () => {
    if (!audioURL) return;

    setIsDeleting(true);
    try {
      await deleteFromSupabase();
      deleteRecording();
      onAudioChange?.(null);
      setAudioSource(null);
      setExistingRecording(null);
      
      // Cleanup blob URL if it exists
      if (audioURL.startsWith('blob:')) {
        URL.revokeObjectURL(audioURL);
      }
    } catch (err) {
      console.error('Error deleting recording:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle component unmount cleanup
  useEffect(() => {
    return () => {
      // Cleanup any blob URLs when component unmounts
      if (audioURL?.startsWith('blob:')) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  if (disabled) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      {!audioURL ? (
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading}
          className={`p-2 rounded-lg transition-colors ${
            isRecording 
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-healing-ocean text-white hover:bg-opacity-90'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isRecording ? 'Stop recording' : 'Start recording'}
        >
          {isRecording ? (
            <Square className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <div className="p-2">
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            </div>
          ) : (
            <>
              <audio 
                ref={audioRef}
                controls 
                className="h-8 w-32"
                controlsList="nodownload"
                preload="auto"
                onLoadedData={() => setIsAudioLoaded(true)}
                onError={() => {
                  setAudioError('Error playing audio');
                  setIsAudioLoaded(false);
                }}
              >
                <source 
                  src={audioURL} 
                  type="audio/webm"
                />
              </audio>
              <button
                onClick={handleDelete}
                disabled={isDeleting || !isAudioLoaded}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete recording"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      )}
      {(error || audioError) && (
        <div className="text-red-500 text-sm mt-2">
          {error || audioError}
        </div>
      )}
    </div>
  );
}