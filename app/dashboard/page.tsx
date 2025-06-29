"use client";

import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "./DashboardLayout";
import LogInModal from "../components/modals/LogInModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import SearchBar from "../components/UI Props/SearchBar";
import DashboardTitle from "../components/DashboardTitle";
import DashboardSelected from "../components/DashboardSelected";
import DashboardTop from "../components/DashboardTop";
import axios from "axios";
import { MovieItem, MovieDuration } from "../types";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/firebase";

// Add this type if not already in your types.ts
type MovieItemWithDuration = MovieItem & {
  duration: number | null;
};

export default function Dashboard() {
  const [selectedMovies, setSelectedMovies] = useState<MovieItem[]>([]);
  const [topMovies, setTopMovies] = useState<MovieItem[]>([]);
  const [movieDurations, setMovieDurations] = useState<MovieDuration[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [isLoadingDurations, setIsLoadingDurations] = useState(true);

  // Loading is true if either movies or durations are still loading
  const isLoading = isLoadingMovies || isLoadingDurations;

  async function fetchData() {
    try {
      const [selectedRes, topRes] = await Promise.all([
        axios.get<{ data: MovieItem[] }>(
          "https://advanced-internship-api-production.up.railway.app/selectedMovies"
        ),
        axios.get<{ data: MovieItem[] }>(
          "https://advanced-internship-api-production.up.railway.app/topMovies"
        ),
      ]);
      setSelectedMovies(selectedRes.data.data);
      setTopMovies(topRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingMovies(false);
    }
  }

  async function fetchMovieDurations() {
    try {
      const data = await getDocs(collection(db, "movies"));
      const movies = data.docs.map((doc) => ({
        id: doc.id,
        duration: doc.data().duration,
      })) as MovieDuration[];
      setMovieDurations(movies);
    } catch (error) {
      console.error("Error fetching durations:", error);
    } finally {
      setIsLoadingDurations(false);
    }
  }

  useEffect(() => {
    fetchData();
    fetchMovieDurations();
  }, []);

  // Merge selectedMovies with their corresponding duration
  const mergedSelectedMovies = useMemo<MovieItemWithDuration[]>(() => {
    return selectedMovies.map((movie) => ({
      ...movie,
      duration: movieDurations.find((d) => d.id === movie.id)?.duration || null,
    }));
  }, [selectedMovies, movieDurations]);

  // Merge topMovies with their corresponding duration
  const mergedTopMovies = useMemo<MovieItemWithDuration[]>(() => {
    return topMovies.map((movie) => ({
      ...movie,
      duration: movieDurations.find((d) => d.id === movie.id)?.duration || null,
    }));
  }, [topMovies, movieDurations]);

  return (
    <DashboardLayout>
      <SearchBar />
      <DashboardTitle />
      <DashboardSelected
        selectedMovies={mergedSelectedMovies}
        isLoading={isLoading}
      />
      <DashboardTop topMovies={mergedTopMovies} isLoading={isLoading} />
      <LogInModal />
      <SignUpModal />
      <ForgotPasswordModal />
    </DashboardLayout>
  );
}
