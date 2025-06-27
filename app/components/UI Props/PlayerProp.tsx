"use client";
import { useAudioPlayerContext } from "@/app/components/audio/AudioPlayerContext";
import { MovieItem } from "@/app/dashboard/types";
import {
  ForwardIcon,
  PlayCircleIcon,
  BackwardIcon,
  PauseCircleIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function PlayerProp({ movieData }: { movieData: MovieItem }) {
  const {
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    timeProgress,
    setTimeProgress,
    audioRef,
    progressBarRef,
  } = useAudioPlayerContext();

  // Format time as MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle play/pause
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Handle skip forward/backward (15 seconds)
  const skipForward = () => {
    audioRef.current && (audioRef.current.currentTime += 15);
  };

  const skipBackward = () => {
    audioRef.current && (audioRef.current.currentTime -= 15);
  };

  // Update duration when metadata loads
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      progressBarRef.current &&
        (progressBarRef.current.max = audioRef.current.duration.toString());
    }
  };

  // Animation frame for smooth progress bar updates
  const playAnimationRef = useRef<number | null>(null);

  const updateProgress = () => {
    if (audioRef.current) {
      setTimeProgress(audioRef.current.currentTime);
      progressBarRef.current &&
        (progressBarRef.current.value =
          audioRef.current.currentTime.toString());
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    } else {
      audioRef.current?.pause();
      playAnimationRef.current &&
        cancelAnimationFrame(playAnimationRef.current);
    }

    return () => {
      playAnimationRef.current &&
        cancelAnimationFrame(playAnimationRef.current);
    };
  }, [isPlaying]);

  // Handle progress bar change
  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      audioRef.current.currentTime = Number(progressBarRef.current.value);
      setTimeProgress(Number(progressBarRef.current.value));
    }
  };

  return (
    <div className="fixed left-0 bottom-0 w-full h-[80px] bg-blue-800 z-50 flex justify-between items-center">
      <div className="flex gap-1 ml-20">
        <Image
          src={movieData.imageLink}
          height={30}
          width={30}
          alt={`${movieData.title} image`}
          priority
        />
        <div className="flex flex-col justify-center ml-2 text-sm">
          <span className="text-white">{movieData.title}</span>
          <span className="text-gray-400">{movieData.director}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={skipBackward}>
          <BackwardIcon className="h-6 w-6 text-white cursor-pointer" />
        </button>
        <button onClick={togglePlay}>
          {isPlaying ? (
            <PauseCircleIcon className="h-10 w-10 text-white cursor-pointer" />
          ) : (
            <PlayCircleIcon className="h-10 w-10 text-white cursor-pointer" />
          )}
        </button>
        <button onClick={skipForward}>
          <ForwardIcon className="h-6 w-6 text-white cursor-pointer" />
        </button>
      </div>

      <div className="mr-40 flex items-center gap-2">
        <span>{formatTime(timeProgress)}</span>
        <input
          type="range"
          ref={progressBarRef}
          onChange={handleProgressChange}
          defaultValue="0"
          className="w-32"
        />
        <span>{formatTime(duration || 0)}</span>
      </div>

      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />
    </div>
  );
}
