"use client";

import { MovieItem } from "@/app/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import MovieLayout from "../MovieLayout";
import SearchBar from "@/app/components/UI Props/SearchBar";
import LogInModal from "@/app/components/modals/LogInModal";
import SignUpModal from "@/app/components/modals/SignUpModal";
import ForgotPasswordModal from "@/app/components/modals/ForgotPasswordModal";

import MovieDetails from "@/app/components/MovieDetails";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "@/firebase";
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
  const [movieDuration, setMovieDuration] = useState<number | null>(null);
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

  async function fetchMovieDuration() {
    if (!id) return;
    const docRef = doc(db, "movies", id as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setMovieDuration(docSnap.data().duration);
    } else {
      setMovieDuration(null);
    }
  }

  useEffect(() => {
    fetchMovieData();
    fetchMovieDuration();
  }, [id]);

  return (
    <>
      <MovieLayout>
        <SearchBar />
        <MovieDetails
          movieData={movieData}
          error={error}
          movieDuration={movieDuration}
        />

        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </MovieLayout>
    </>
  );
}
