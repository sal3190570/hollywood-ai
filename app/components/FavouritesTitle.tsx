import React from "react";

export default function FavouritesTitle({
  favouriteMoviesIds,
}: {
  favouriteMoviesIds: [] | string[];
}) {
  return (
    <>
      <div className="flex flex-col relative justify-center w-full h-[110px]">
        <div className="ml-8 moving-marginLeft relative">
          <h1 className="text-[22px] font-bold">Saved Movies</h1>
          <span className="text-gray-400">
            {favouriteMoviesIds.length} Movies
          </span>
          <div
            className="absolute -bottom-4 left-0 w-[calc(100%+2rem)] h-[1px] bg-gray-300"
            style={{ width: "90%" }}
          ></div>
        </div>
      </div>
    </>
  );
}
