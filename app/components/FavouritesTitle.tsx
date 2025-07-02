import React from "react";
import { Skeleton } from "@mui/material";

export default function FavouritesTitle({
  favouriteMoviesIds,
  isLoading,
}: {
  favouriteMoviesIds: string[];
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col relative justify-center w-full h-[110px]">
      <div className="ml-8 moving-marginLeft relative">
        {isLoading ? (
          <>
            <Skeleton variant="text" width={160} height={32} />
            <Skeleton
              variant="text"
              width={80}
              height={20}
              style={{ marginTop: 4 }}
            />
            <Skeleton
              variant="rectangular"
              width="90%"
              height={2}
              style={{ marginTop: 16 }}
            />
          </>
        ) : (
          <>
            <h1 className="text-[22px] font-bold">Saved Movies</h1>
            <span className="text-gray-400">
              {favouriteMoviesIds.length} Movies
            </span>
            <div
              className="absolute -bottom-4 left-0 w-[calc(100%+2rem)] h-px bg-gray-300"
              style={{ width: "90%" }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
}
