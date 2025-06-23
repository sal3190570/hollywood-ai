import React from "react";
import Carousel from "./Carousel";
import { MovieItem } from "../dashboard/types";
import NoFavourites from "./UI Props/NoFavourites";
import LoginProp from "./UI Props/LoginProp";

export default function FavouritesSelected({
  favouriteMoviesData,
  isLoading,
  isAuthenticated,
}: {
  favouriteMoviesData: MovieItem[];
  isLoading?: boolean;
  isAuthenticated: boolean;
}) {
  return (
    <div className="w-full px-4 moving-marginLeft md:max-w-[1200px] md:ml-10">
      {isAuthenticated && favouriteMoviesData.length === 0 && <NoFavourites />}
      {!isAuthenticated && (
        <LoginProp text={"Sign in to see your favourite movies"} />
      )}
      {isAuthenticated && <Carousel data={favouriteMoviesData || []} />}
    </div>
  );
}
