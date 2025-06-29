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

export default function page() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState<MovieItem>(defaultMovieItem);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMovieData() {
    try {
      const { data } = await axios.get(
        `https://advanced-internship-api-production.up.railway.app/movies/${id}`
      );

      if (data.data) {
        setMovieData(data.data);
      } else if (data.id) {
        setMovieData(data);
      } else if (data.status === "fail") {
        setError(data.message || "Movie not found");
      }
    } catch (error) {
      setError("Failed to fetch movie");
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchMovieData();
  }, [id]);

  return (
    <>
      <PlayerLayout>
        <PlayerContent
          movieData={movieData}
          error={error}
          isLoading={isLoading}
        />
        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </PlayerLayout>
    </>
  );
}
