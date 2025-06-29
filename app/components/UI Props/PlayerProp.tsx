"use client";
import { doc, Firestore, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
}: {
  movieData?: MovieItem;
  isLoading: boolean;
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

  // Safe default for movieData
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
  }, [safeMovieData]);

  return (
    <div className="fixed left-0 bottom-0 w-full h-[80px] bg-blue-800 z-50 flex justify-between items-center">
      {/* Left Section: Image and Title/Director */}
      <div className="flex gap-1 ml-20">
        {isLoading ? (
          <Skeleton
            variant="circular"
            width={30}
            height={30}
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
          />
        ) : safeMovieData.imageLink && safeMovieData.imageLink.trim() !== "" ? (
          <Image
            src={safeMovieData.imageLink}
            height={30}
            width={30}
            alt={`${safeMovieData.title} image`}
            priority
          />
        ) : (
          <div className="h-[30px] w-[30px] bg-gray-200 rounded-full" />
        )}
        <div className="flex flex-col justify-center ml-2 text-sm">
          {isLoading ? (
            <>
              <Skeleton
                variant="text"
                width={100}
                height={16}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              />
              <Skeleton
                variant="text"
                width={80}
                height={12}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              />
            </>
          ) : (
            <>
              <span className="text-white">{safeMovieData.title}</span>
              <span className="text-gray-400">{safeMovieData.director}</span>
            </>
          )}
        </div>
      </div>

      {/* Center Section: Player Controls */}
      <div className="flex gap-2">
        <button
          onClick={skipBackward}
          disabled={isLoading}
          className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
        >
          <BackwardIcon className="h-6 w-6 text-white cursor-pointer" />
        </button>
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
        >
          {isLoading ? (
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            />
          ) : isPlaying ? (
            <PauseCircleIcon className="h-10 w-10 text-white cursor-pointer" />
          ) : (
            <PlayCircleIcon className="h-10 w-10 text-white cursor-pointer" />
          )}
        </button>
        <button
          onClick={skipForward}
          disabled={isLoading}
          className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
        >
          <ForwardIcon className="h-6 w-6 text-white cursor-pointer" />
        </button>
      </div>

      {/* Right Section: Progress Bar */}
      <div className="mr-40 flex items-center gap-2">
        {isLoading ? (
          <>
            <Skeleton
              variant="text"
              width={40}
              height={16}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            />
            <Skeleton
              variant="text"
              width={120}
              height={16}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            />
            <Skeleton
              variant="text"
              width={40}
              height={16}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            />
          </>
        ) : (
          <>
            <span>{formatTime(timeProgress)}</span>
            <input
              type="range"
              ref={progressBarRef}
              onChange={handleProgressChange}
              defaultValue="0"
              className="w-32"
            />
            <span>{formatTime(duration || 0)}</span>
          </>
        )}
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
