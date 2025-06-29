import { MovieItemWithDuration } from "@/app/types";
import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SearchbarProp({
  movie,
}: {
  movie: MovieItemWithDuration;
}) {
  // Format time as MM:SS
  const formatTime = (time: number | null) => {
    if (time === null || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="relative flex w-full h-fit border-t-[1px] border-gray-300 p-4 hover:bg-gray-100 transition"
    >
      {movie.imageLink && movie.imageLink.trim() !== "" ? (
        <Image
          src={movie.imageLink}
          height={60}
          width={60}
          alt={`${movie.title} poster`}
          className="object-cover"
        />
      ) : (
        <div className="h-[60px] w-[60px] bg-gray-200" />
      )}
      <div className="flex flex-col ml-4 gap-1">
        <span className="font-semibold">{movie.title}</span>
        <span className="text-sm text-gray-500">{movie.director}</span>
        <span className="text-sm mt-1 text-gray-500 flex gap-1 ">
          <ClockIcon className="h-5 w-fit" /> {formatTime(movie.duration)}
        </span>
      </div>
    </Link>
  );
}
