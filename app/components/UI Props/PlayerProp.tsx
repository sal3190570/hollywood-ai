"use client";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAudioPlayerContext } from "@/app/components/audio/AudioPlayerContext";
import { MovieItem } from "@/app/types";
import {
  ForwardIcon,
  PlayCircleIcon,
  BackwardIcon,
  PauseCircleIcon,
} from "@heroicons/react/16/solid";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

export default function PlayerProp({
  movieData,
  isLoading,
  onAudioLoaded,
}: {
  movieData?: MovieItem;
  isLoading: boolean;
  onAudioLoaded?: () => void;
}) {
  const [audioFile, setAudioFile] = useState("");
  const [error, setError] = useState("");

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

  const safeMovieData = movieData || {
    id: "",
    director: "",
    title: "",
    tagLine: "",
    imageLink: "",
    audioLink: "",
    rating: "",
    releaseYear: "",
    type: "",
    summary: "",
    tags: [],
    movieDescription: "",
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    audioRef.current && (audioRef.current.currentTime += 15);
  };

  const skipBackward = () => {
    audioRef.current && (audioRef.current.currentTime -= 15);
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      progressBarRef.current &&
        (progressBarRef.current.max = audioRef.current.duration.toString());
      if (onAudioLoaded) onAudioLoaded();
    }
  };

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

  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      audioRef.current.currentTime = Number(progressBarRef.current.value);
      setTimeProgress(Number(progressBarRef.current.value));
    }
  };

  async function fetchAudioFileAndDuration() {
    if (!safeMovieData || !safeMovieData.audioLink || !safeMovieData.id) return;
    const docRef = doc(db, "movies", safeMovieData.id);
    const docSnap = await getDoc(docRef);
    let fireStoreDuration = docSnap.exists() ? docSnap.data().duration : null;
    let audioUrl = "";
    try {
      const response = await axios.get(
        `https://advanced-internship-api-production.up.railway.app/${safeMovieData.audioLink}`,
        { responseType: "blob" }
      );
      audioUrl = URL.createObjectURL(response.data);
      setAudioFile(audioUrl);
    } catch (error) {
      setError("Failed to fetch audio file");
      console.log(error);
      return;
    }
    if (fireStoreDuration) {
      setDuration(fireStoreDuration);
      if (onAudioLoaded) onAudioLoaded();
      return;
    }
    const tempAudio = new window.Audio(audioUrl);
    tempAudio.addEventListener(
      "loadedmetadata",
      async () => {
        const duration = tempAudio.duration;
        setDuration(duration);
        if (docSnap.exists()) {
          await updateDoc(docRef, { duration });
        } else {
          await setDoc(docRef, { duration }, { merge: true });
        }
        if (onAudioLoaded) onAudioLoaded();
      },
      { once: true }
    );
  }

  useEffect(() => {
    fetchAudioFileAndDuration();
    return () => {
      if (audioFile) {
        URL.revokeObjectURL(audioFile);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeMovieData.id, safeMovieData.audioLink]);

  return (
    <div
      className="
        fixed left-0 bottom-0 w-full z-50
        bg-neutral-900 border-t border-neutral-800
        flex items-center justify-between
        px-6 py-3
        min-h-[70px]
        shadow-xl
      "
    >
      {/* Left: Cover & Info */}
      <div className="flex items-center gap-3 min-w-0 w-[240px]">
        {isLoading ? (
          <Skeleton variant="circular" width={44} height={44} />
        ) : safeMovieData.imageLink ? (
          <Image
            src={safeMovieData.imageLink}
            height={44}
            width={44}
            alt={`${safeMovieData.title} image`}
            className="rounded-lg object-cover bg-gray-200"
            priority
          />
        ) : (
          <div className="h-11 w-11 bg-gray-800 rounded-lg" />
        )}
        <div className="flex flex-col justify-center min-w-0">
          {isLoading ? (
            <>
              <Skeleton variant="text" width={100} height={18} />
              <Skeleton variant="text" width={60} height={14} />
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-white truncate">
                {safeMovieData.title}
              </span>
              <span className="text-xs text-neutral-300 truncate">
                {safeMovieData.director}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Center: Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={skipBackward}
          disabled={isLoading}
          className="p-1 rounded-full hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Back 15 seconds"
        >
          <BackwardIcon className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isLoading ? (
            <Skeleton variant="circular" width={28} height={28} />
          ) : isPlaying ? (
            <PauseCircleIcon className="h-7 w-7 text-white" />
          ) : (
            <PlayCircleIcon className="h-7 w-7 text-white" />
          )}
        </button>
        <button
          onClick={skipForward}
          disabled={isLoading}
          className="p-1 rounded-full hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Forward 15 seconds"
        >
          <ForwardIcon className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Right: Progress Bar + Time */}
      <div className="flex flex-col items-end w-[260px]">
        <div className="flex items-center gap-2 w-full">
          {isLoading ? (
            <>
              <Skeleton variant="text" width={32} height={16} />
              <Skeleton variant="rectangular" width={120} height={8} />
              <Skeleton variant="text" width={32} height={16} />
            </>
          ) : (
            <>
              <span className="text-xs text-neutral-400 tabular-nums w-10 text-right">
                {formatTime(timeProgress)}
              </span>
              <input
                type="range"
                ref={progressBarRef}
                onChange={handleProgressChange}
                defaultValue="0"
                // Orange slider and smaller thumb
                className="
                  w-[120px] accent-orange-500
                  h-1.5 rounded-lg
                  bg-neutral-700
                  transition
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-2
                  [&::-webkit-slider-thumb]:h-2
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-orange-500
                  [&::-webkit-slider-thumb]:shadow
                  [&::-webkit-slider-thumb]:transition
                  [&::-moz-range-thumb]:appearance-none
                  [&::-moz-range-thumb]:w-2
                  [&::-moz-range-thumb]:h-2
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-orange-500
                  [&::-ms-thumb]:appearance-none
                  [&::-ms-thumb]:w-2
                  [&::-ms-thumb]:h-2
                  [&::-ms-thumb]:rounded-full
                  [&::-ms-thumb]:bg-orange-500
                "
                min={0}
                max={duration || 0}
                step={1}
              />
              <span className="text-xs text-neutral-400 tabular-nums w-10 text-left">
                {formatTime(duration || 0)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Audio Element */}
      {audioFile && (
        <audio
          src={audioFile}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          preload="auto"
        />
      )}
    </div>
  );
}
