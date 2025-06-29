"use client";

import { defaultMovieItem, MovieItem } from "@/app/types";
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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Page() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState<MovieItem>(defaultMovieItem);
  const [error, setError] = useState<string>("");
  const [movieDuration, setMovieDuration] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const allMovies = useSelector((state: RootState) => state.movies.allMovies);
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
    async function fetchAllData() {
      setIsLoading(true);
      try {
        await Promise.all([fetchMovieData(), fetchMovieDuration()]);
      } catch (error) {
        console.error("Error fetching all data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllData();
  }, [id]);

  return (
    <>
      <MovieLayout>
        <SearchBar movies={allMovies} />
        <MovieDetails
          movieData={movieData}
          error={error}
          movieDuration={movieDuration}
          isLoading={isLoading} // Optional: only pass if MovieDetails uses it
        />
        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </MovieLayout>
    </>
  );
}
