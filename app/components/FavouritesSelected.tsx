import React from "react";
import Carousel from "./Carousel";
import { MovieItem, MovieItemWithDuration } from "../types";
import NoFavourites from "./UI Props/NoFavourites";
import LoginProp from "./UI Props/LoginProp";
import { Skeleton } from "@mui/material";

function CarouselSkeleton() {
  return (
    <div className="relative flex w-full h-fit border-t-[1px] border-gray-300 p-4">
      <Skeleton variant="rectangular" width={60} height={60} />
      <div className="flex flex-col ml-4 gap-1 w-full">
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="text" width="50%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />
      </div>
    </div>
  );
}

export default function FavouritesSelected({
  favouriteMoviesData,
  isLoading,
  isAuthenticated,
  allMovies = [],
}: {
  favouriteMoviesData: MovieItem[];
  isLoading: boolean;
  isAuthenticated: boolean;
  allMovies?: MovieItemWithDuration[];
}) {
  const carouselData: MovieItemWithDuration[] = favouriteMoviesData.map(
    (movie) => {
      const fullMovie = allMovies.find((m) => m.id === movie.id);
      return {
        ...movie,
        duration: fullMovie?.duration ?? null,
      };
    }
  );

  if (isLoading) {
    return (
      <div className="w-full px-4 moving-marginLeft md:max-w-[1200px] md:ml-10">
        {[...Array(6)].map((_, index) => (
          <CarouselSkeleton key={index} />
        ))}
      </div>
    );
  }
  console.log(allMovies);
  return (
    <div className="w-full px-4 moving-marginLeft md:max-w-[1200px] md:ml-10">
      {isAuthenticated && favouriteMoviesData.length === 0 && <NoFavourites />}
      {!isAuthenticated && (
        <LoginProp text={"Sign in to see your favourite movies"} />
      )}
      {isAuthenticated && <Carousel data={carouselData} />}
    </div>
  );
}
