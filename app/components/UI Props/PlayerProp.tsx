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

export default function PlayerProp({
  movieData,
  isLoading,
}: {
  movieData: MovieItem;
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
    if (!movieData || !movieData.audioLink || !movieData.id) return;

    // 1. Check FireStore for duration
    const docRef = doc(db, "movies", movieData.id);
    const docSnap = await getDoc(docRef);

    let fireStoreDuration = docSnap.exists() ? docSnap.data().duration : null;

    // 2. Fetch audio file as blob and set audioFile state
    let audioUrl = "";
    try {
      const response = await axios.get(
        `https://advanced-internship-api-production.up.railway.app/${movieData.audioLink}`,
        { responseType: "blob" }
      );

      audioUrl = URL.createObjectURL(response.data);
      setAudioFile(audioUrl);
    } catch (error) {
      setError("Failed to fetch audio file");
      console.log(error);
      return;
    }

    // 3. If duration already exists in Firestore, set it and return
    if (fireStoreDuration) {
      setDuration(fireStoreDuration);
      return;
    }

    // 4. Otherwise, extract duration from audio metadata and store in Firestore
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
  }, [movieData]);

  return (
    <div className="fixed left-0 bottom-0 w-full h-[80px] bg-blue-800 z-50 flex justify-between items-center">
      <div className="flex gap-1 ml-20">
        {movieData && (
          <>
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
          </>
        )}
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
        src={audioFile}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />
    </div>
  );
}
