"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchbarProp from "./SearchbarProp";
import { MovieItem, MovieItemWithDuration } from "@/app/types";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

export default function SearchBar({
  movies,
}: {
  movies: MovieItemWithDuration[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<MovieItemWithDuration[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the API call
  const debouncedFetchSearchResults = useDebouncedCallback(
    useCallback(
      async (query: string) => {
        if (!query.trim()) {
          setSearchResults([]);
          setIsOpen(false);
          return;
        }
        setIsLoading(true);
        try {
          // 1. Fetch API results
          const response = await axios.get(
            `https://advanced-internship-api-production.up.railway.app/movies?search=${query}`
          );
          const apiResults = response.data.data || response.data;

          // 2. Extract movie IDs from API results
          const apiMovieIds = apiResults.map((movie: MovieItem) => movie.id);

          // 3. Filter movies to get full MovieItemWithDuration objects for those IDs
          const mergedResults = movies.filter((movie) =>
            apiMovieIds.includes(movie.id)
          );

          // 4. Set merged results as searchResults
          setSearchResults(mergedResults);
          setIsOpen(true);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      },
      [movies]
    ),
    300 // debounce delay
  );

  return (
    <div className="flex relative w-full h-20 items-center justify-start py-2 outline outline-gray-200">
      <div className="flex items-center ml-8 w-[70%] max-w-[420px] sm:w-full sm:max-w-[420px] moving-marginLeft p-1.5 bg-gray-200 rounded-full">
        <MagnifyingGlassIcon className="w-5 h-5 ml-2" />
        <input
          type="text"
          className="w-full text-black rounded-full outline-none px-2 py-1"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(event) => {
            const query = event.target.value;
            setSearchQuery(query);
            debouncedFetchSearchResults(query);
          }}
        />
      </div>
      {isOpen && (
        <div className="absolute flex flex-col ml-8 top-20 w-[70%] sm:w-full sm:max-w-[420px] max-w-[420px] moving-marginLeft bg-white sm:rounded-xl outline-none shadow-lg z-50">
          <h4 className="mt-4 ml-4 font-bold pb-2">Search Results</h4>
          <div className="max-h-[360px] overflow-y-auto">
            {isLoading ? (
              <>
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="relative flex w-full h-fit border-t-[1px] border-gray-300 p-4"
                  >
                    <Skeleton variant="rectangular" width={60} height={60} />
                    <div className="flex flex-col ml-4 gap-1 w-full">
                      <Skeleton variant="text" width="70%" height={24} />
                      <Skeleton variant="text" width="50%" height={20} />
                      <Skeleton variant="text" width="40%" height={20} />
                    </div>
                  </div>
                ))}
              </>
            ) : searchResults.length > 0 ? (
              searchResults.map((movie) => (
                <SearchbarProp key={movie.id} movie={movie} />
              ))
            ) : (
              <div className="flex flex-col justify-center items-center h-[100px] border-t-[1px] border-gray-300">
                <span className="font-semibold text-xl">No Results.</span>
                <span className="text-gray-500">Please try again.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
