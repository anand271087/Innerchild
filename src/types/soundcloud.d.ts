interface SoundCloudWidget {
  bind(event: string, callback: () => void): void;
  unbind(event: string): void;
  load(url: string, options?: object): void;
  play(): void;
  pause(): void;
  toggle(): void;
  seekTo(milliseconds: number): void;
  setVolume(volume: number): void;
  next(): void;
  prev(): void;
  skip(soundIndex: number): void;
  getDuration(callback: (duration: number) => void): void;
  getPosition(callback: (position: number) => void): void;
  getCurrentSound(callback: (sound: object) => void): void;
  getCurrentSoundIndex(callback: (index: number) => void): void;
  getVolume(callback: (volume: number) => void): void;
  isPlaying(callback: (playing: boolean) => void): void;
}

interface SoundCloudWidgetAPI {
  Widget: {
    new (iframe: HTMLIFrameElement): SoundCloudWidget;
    Events: {
      READY: string;
      PLAY: string;
      PAUSE: string;
      FINISH: string;
      LOAD_PROGRESS: string;
      PLAY_PROGRESS: string;
      ERROR: string;
    };
  };
}

declare global {
  interface Window {
    SC: SoundCloudWidgetAPI;
  }
}