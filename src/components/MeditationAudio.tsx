import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface MeditationAudioProps {
  dayNumber: number;
}

interface MeditationTrack {
  title: string;
  trackId: string;
}

export default function MeditationAudio({ dayNumber }: MeditationAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const initTimeoutRef = useRef<NodeJS.Timeout>();

  const getMeditationTrack = (day: number): MeditationTrack => {
    const tracks: Record<number, MeditationTrack> = {
      1: {
        title: 'Progressive Muscle Relaxation',
        trackId: '1960921043',
      },
      2: {
        title: 'Progressive Muscle Relaxation',
        trackId: '1960921043',
      },
      3: {
        title: 'Progressive Muscle Relaxation',
        trackId: '1960921043',
      },
      4: {
        title: 'Mindfulness Breathwork',
        trackId: '1961745687', 
      },
      5: {
        title: 'Mindfulness Breathwork',
        trackId: '1961745687', 
      },
      6: {
        title: 'Mindfulness Breathwork',
        trackId: '1961745687', 
      },
      7: {
        title: 'Childhood Joyful Memories',
        trackId: '1961816423', 
      },
      8: {
        title: 'Childhood Challenging Memories',
        trackId: '1961817767', 
      },
      9: {
        title: 'Childhood Anxious Memories',
        trackId: '1961818427', 
      },
      10: {
        title: 'Teenage Joyful Memories',
        trackId: '1961822451', 
      },
      11: {
        title: 'Teenage Hurtful Memories',
        trackId: '1961826007', 
      },
      12: {
        title: 'Teenage Hurtful Memories',
        trackId: '1961826007', 
      },
    };

    return tracks[day] || {
      title: `Day ${day} Meditation`,
      trackId: '1960921043',
    };
  };

  const currentTrack = getMeditationTrack(dayNumber);

  useEffect(() => {
    let scriptLoaded = false;
    const existingScript = document.querySelector(
      'script[src="https://w.soundcloud.com/player/api.js"]'
    );

    const initializeWidget = () => {
      if (!iframeRef.current || !window.SC) return;

      try {
        widgetRef.current = window.SC.Widget(iframeRef.current);

        widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
          setIsLoading(false);
          widgetRef.current?.getDuration((d: number) => {
            setDuration(Math.round(d / 1000));
          });
        });

        widgetRef.current.bind(window.SC.Widget.Events.PLAY, () =>
          setIsPlaying(true)
        );
        widgetRef.current.bind(window.SC.Widget.Events.PAUSE, () =>
          setIsPlaying(false)
        );
        widgetRef.current.bind(window.SC.Widget.Events.FINISH, () =>
          setIsPlaying(false)
        );
        widgetRef.current.bind(window.SC.Widget.Events.ERROR, () => {
          setError('Unable to load meditation audio. Please try again later.');
          setIsPlaying(false);
          setIsLoading(false);
        });
      } catch (err) {
        setError('Failed to initialize audio player. Please refresh the page.');
        setIsLoading(false);
      }
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;

      script.onload = () => {
        scriptLoaded = true;
        initializeWidget();
      };

      script.onerror = () => {
        setError(
          'Failed to load audio player. Please check your internet connection.'
        );
        setIsLoading(false);
      };

      document.body.appendChild(script);
    } else if (window.SC) {
      initializeWidget();
    }

    initTimeoutRef.current = setTimeout(() => {
      if (isLoading && !scriptLoaded) {
        setError(
          'Audio player is taking too long to load. Please refresh the page.'
        );
        setIsLoading(false);
      }
    }, 10000);

    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
      
      // Safely cleanup widget bindings
      if (widgetRef.current && window.SC) {
        try {
          const events = window.SC.Widget.Events;
          const widget = widgetRef.current;
          
          if (widget && typeof widget.unbind === 'function') {
            widget.unbind(events.READY);
            widget.unbind(events.PLAY);
            widget.unbind(events.PAUSE);
            widget.unbind(events.FINISH);
            widget.unbind(events.ERROR);
          }
        } catch (err) {
          // Silently handle cleanup errors
          console.debug('Widget cleanup completed');
        }
      }
    };
  }, [dayNumber]);

  const togglePlay = () => {
    if (!widgetRef.current) {
      setError('Audio player not initialized. Please refresh the page.');
      return;
    }

    try {
      if (isPlaying) {
        widgetRef.current.pause();
      } else {
        widgetRef.current.play();
      }
    } catch (err) {
      setError('Failed to control playback. Please refresh the page.');
      setIsPlaying(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">
        <Volume2 className="w-5 h-5 inline-block mr-2" />
        Today's Meditation: {currentTrack.title}
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlay}
          disabled={isLoading || !!error}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isPlaying ? 'Pause meditation' : 'Play meditation'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span className="ml-2">
            {isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'} Meditation
          </span>
        </button>

        <div className="text-sm text-gray-600">
          {isLoading
            ? 'Loading duration...'
            : duration
            ? `Duration: ${formatDuration(duration)}`
            : 'Duration: --:--'}
        </div>
      </div>

      <iframe
        ref={iframeRef}
        width="100%"
        height="0"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${currentTrack.trackId}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`}
        className="hidden"
      />

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p>
          Find a quiet, comfortable space. Close your eyes and follow along with
          today's guided meditation.
        </p>
        <p className="text-xs">
          Note: Audio will begin playing when you click the play button.
        </p>
      </div>
    </div>
  );
}