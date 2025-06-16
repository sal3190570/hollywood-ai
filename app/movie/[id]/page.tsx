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
export default function Page() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState<MovieItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const { data } = await axios.get(
          `https://advanced-internship-api-production.up.railway.app/movies/${id}`
        );
        // Option 1: If movie is in a 'data' field
        if (data.data) {
          setMovieData(data.data);
        }
        // Option 2: If movie is in the root
        else if (data.id) {
          setMovieData(data);
        }
        // If no movie found
        else if (data.status === "fail") {
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
        {/* Always visible components */}
        <SearchBar />

        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </MovieLayout>
      {error && <div className="text-red-500">{error}</div>}
      {movieData && (
        <div>
          <h1>{movieData.title}</h1>
          <p>{movieData.director}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </>
  );
}
