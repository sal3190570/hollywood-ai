"use client";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { MovieItem } from "../dashboard/types";

export default function FavouritesSelected() {
  const [favouriteMoviesIds, setFavouriteMoviesIds] = useState<string[] | null>(
    null
  );
  const [favouriteMoviesData, setFavouriteMoviesData] = useState<
    MovieItem[] | null
  >(null);
  const [error, setError] = useState("");
  const userId = useSelector((state: RootState) => state.user.uid);

  async function fetchMovieData(id: string): Promise<MovieItem | null> {
    try {
      const { data } = await axios.get(
        `https://advanced-internship-api-production.up.railway.app/movies/${id}`
      );
      if (data.data) return data.data as MovieItem;
      if (data.id) return data as MovieItem;
      throw new Error("Movie data not found");
    } catch (err) {
      console.error("Error fetching movie data:", err);
      setError("Failed to fetch some movies");
      return null;
    }
  }

  useEffect(() => {
    async function fetchFavourites() {
      if (!userId) {
        setFavouriteMoviesIds(null);
        setFavouriteMoviesData(null);
        return;
      }
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists() || !userDocSnap.data()?.favourites) {
        setFavouriteMoviesIds(null);
        setFavouriteMoviesData([]);
        return;
      }
      const favourites = userDocSnap.data()?.favourites || [];
      setFavouriteMoviesIds(favourites);
      const movieDataPromises = favourites.map((id: string) =>
        fetchMovieData(id)
      );
      const movieDataResults = await Promise.all(movieDataPromises);
      setFavouriteMoviesData(
        movieDataResults.filter((item): item is MovieItem => item !== null)
      );
    }
    if (userId) fetchFavourites();
  }, [userId]);

  return (
    <div className="w-full px-4 moving-marginLeft md:max-w-[1200px] md:ml-10">
      <Carousel data={favouriteMoviesData || []} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
