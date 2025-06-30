import React from "react";
import { MovieItem } from "../types";
import PlayerProp from "./UI Props/PlayerProp";
import { AudioPlayerProvider } from "./audio/AudioPlayerContext";
import Skeleton from "@mui/material/Skeleton";

export default function PlayerContent({
  movieData,
  error,
  isLoading,
  onAudioLoaded,
}: {
  movieData: MovieItem;
  error: string;
  isLoading: boolean;
  onAudioLoaded: () => void;
}) {
  if (!movieData) return null;

  return (
    <div className="w-full flex flex-col px-8 mt-5 pb-4">
      {isLoading ? (
        <>
          <Skeleton
            variant="text"
            width={200}
            height={32}
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={100}
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={120}
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={80}
            animation="wave"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={200}
            animation="wave"
            sx={{ mb: 2 }}
          />
        </>
      ) : (
        <>
          <h1 className="font-bold text-xl mb-6">{movieData.title}</h1>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="whitespace-pre-line text-[15px] leading-tight">
              {movieData.summary}
            </p>
          )}
        </>
      )}
      <AudioPlayerProvider>
        <PlayerProp
          movieData={movieData}
          isLoading={isLoading}
          onAudioLoaded={onAudioLoaded}
        />
      </AudioPlayerProvider>
    </div>
  );
}
