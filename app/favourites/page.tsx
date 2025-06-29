"use client";

import FavouritesLayout from "./FavouritesLayout";
import LogInModal from "../components/modals/LogInModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import SearchBar from "../components/UI Props/SearchBar";
import FavouritesSelected from "../components/FavouritesSelected";
import FavouritesTitle from "../components/FavouritesTitle";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { MovieItem } from "../types";
import { useEffect, useState } from "react";

export default function Page() {
  const [favouriteMoviesIds, setFavouriteMoviesIds] = useState<string[] | []>(
    []
  );
  const [favouriteMoviesData, setFavouriteMoviesData] = useState<MovieItem[]>(
    []
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state: RootState) => state.user.uid);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

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
        setFavouriteMoviesIds([]);
        setFavouriteMoviesData([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists() || !userDocSnap.data()?.favourites) {
        setFavouriteMoviesIds([]);
        setFavouriteMoviesData([]);
        setIsLoading(false);
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
      setIsLoading(false);
    }
    if (userId) fetchFavourites();
    else setIsLoading(false); // Ensure loading is false if no user
  }, [userId]);

  return (
    <FavouritesLayout>
      <SearchBar />
      <FavouritesTitle favouriteMoviesIds={favouriteMoviesIds} />
      <FavouritesSelected
        favouriteMoviesData={favouriteMoviesData}
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
      />
      <LogInModal />
      <SignUpModal />
      <ForgotPasswordModal />
    </FavouritesLayout>
  );
}
