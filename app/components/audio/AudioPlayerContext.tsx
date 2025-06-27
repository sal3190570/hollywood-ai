import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface Track {
  title: string;
  src: string;
  author?: string;
  imageLink?: string;
}

interface AudioPlayerContextType {
  currentTrack: Track;
  setCurrentTrack: Dispatch<SetStateAction<Track>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  timeProgress: number;
  setTimeProgress: Dispatch<SetStateAction<number>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const AudioPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<Track>({
    title: "",
    src: "",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const value = {
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    timeProgress,
    setTimeProgress,
    audioRef,
    progressBarRef,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayerContext = () => {
  const context = useContext(AudioPlayerContext);
  if (!context)
    throw new Error(
      "useAudioPlayerContext must be used within AudioPlayerProvider"
    );
  return context;
};
