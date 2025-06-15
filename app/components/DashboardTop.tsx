"use client";

import { MovieItem } from "../dashboard/types";
import Carousel from "./Carousel";

export default function DashboardTop({
  topMovies,
  isLoading,
}: {
  topMovies: MovieItem[];
  isLoading?: boolean;
}) {
  return (
    <div className="flex flex-col h-[500px] w-full mt-8">
      <div className="flex flex-col mt-10 ml-10 moving-marginLeft">
        <h2 className="text-[22px] font-bold">Top Movies</h2>
        <p className="text-gray-500 text-sm leading-tight">
          Enjoy our highest rated films.
        </p>
      </div>
      <div className="flex max-w-[1200px] moving-marginLeft ml-10">
        <Carousel data={isLoading ? Array(6).fill(null) : topMovies} />
      </div>
    </div>
  );
}
