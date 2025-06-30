"use client";
import React, { useEffect, useState } from "react";
import PlayerLayout from "../PlayerLayout";
import LogInModal from "@/app/components/modals/LogInModal";
import SignUpModal from "@/app/components/modals/SignUpModal";
import ForgotPasswordModal from "@/app/components/modals/ForgotPasswordModal";
import PlayerContent from "@/app/components/PlayerContent";
import axios from "axios";
import { useParams } from "next/navigation";
import { defaultMovieItem, MovieItem } from "@/app/types";

export default function Page() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState<MovieItem>(defaultMovieItem);
  const [error, setError] = useState<string>("");
  const [isMovieLoading, setIsMovieLoading] = useState(true);
  const [isAudioLoading, setIsAudioLoading] = useState(true);

  async function fetchMovieData() {
    setIsMovieLoading(true);
    try {
      const { data } = await axios.get(
        `https://advanced-internship-api-production.up.railway.app/movies/${id}`
      );
      const movie = data.data || data;
      setMovieData(movie);
    } catch (error) {
      setError("Failed to fetch movie");
      console.error("Error fetching data:", error);
    } finally {
      setIsMovieLoading(false);
    }
  }

  useEffect(() => {
    fetchMovieData();
  }, [id]);

  // Only show real content when both movie and audio are loaded
  const isLoading = isMovieLoading || isAudioLoading;

  return (
    <>
      <PlayerLayout>
        <PlayerContent
          movieData={movieData}
          error={error}
          isLoading={isLoading}
          onAudioLoaded={() => setIsAudioLoading(false)}
        />
        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </PlayerLayout>
    </>
  );
}
