// PlayerContent.jsx

import React from "react";
import { MovieItem } from "../types";
import PlayerProp from "./UI Props/PlayerProp";
import { AudioPlayerProvider } from "./audio/AudioPlayerContext";

export default function PlayerContent({
  movieData,
  error,
  isLoading,
}: {
  movieData: MovieItem;
  error: string;
  isLoading: boolean;
}) {
  return (
    <div className="w-full flex flex-col px-8 mt-5 pb-4">
      {movieData && (
        <>
          <h1 className="font-bold text-xl mb-6">{movieData.title}</h1>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="whitespace-pre-line text-[15px] leading-tight">
              {movieData.summary}
            </p>
          )}
          <AudioPlayerProvider>
            <PlayerProp movieData={movieData} isLoading={isLoading} />
          </AudioPlayerProvider>
        </>
      )}
    </div>
  );
}
