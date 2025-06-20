"use client";

import { MovieItem } from "@/app/dashboard/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import MovieLayout from "../MovieLayout";
import SearchBar from "@/app/components/SearchBar";
import LogInModal from "@/app/components/modals/LogInModal";
import SignUpModal from "@/app/components/modals/SignUpModal";
import ForgotPasswordModal from "@/app/components/modals/ForgotPasswordModal";

import MovieDetails from "@/app/components/MovieDetails";
export default function Page() {
  const MovieItem = {
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

  const { id } = useParams();
  const [movieData, setMovieData] = useState<MovieItem>(MovieItem);

  const [error, setError] = useState<string>("");

  useEffect(() => {
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
    fetchMovieData();
  }, [id]);

  return (
    <>
      <MovieLayout>
        <SearchBar />
        <MovieDetails movieData={movieData} error={error} />

        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </MovieLayout>
    </>
  );
}
