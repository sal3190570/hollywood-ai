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
          setIsLoading(false);
          return;
        }
        try {
          const response = await axios.get(
            `https://advanced-internship-api-production.up.railway.app/movies?search=${query}`
          );
          const apiResults = response.data.data || response.data;
          const apiMovieIds = apiResults.map((movie: MovieItem) => movie.id);
          const mergedResults = movies.filter((movie) =>
            apiMovieIds.includes(movie.id)
          );
          setSearchResults(mergedResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      },
      [movies]
    ),
    300
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      setIsOpen(true);
      setIsLoading(true);
    } else {
      setIsOpen(false);
      setIsLoading(false);
      setSearchResults([]);
    }
    debouncedFetchSearchResults(query);
  };

  return (
    <div className="flex relative w-full h-20 items-center justify-start py-2 outline outline-gray-200">
      <div className="flex items-center ml-8 w-[70%] max-w-[420px] sm:w-full sm:max-w-[420px] moving-marginLeft p-1.5 bg-gray-200 rounded-full">
        <MagnifyingGlassIcon className="w-5 h-5 ml-2" />
        <input
          type="text"
          className="w-full text-black rounded-full outline-none px-2 py-1"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      {isOpen && (
        <div className="absolute flex flex-col ml-8 top-20 w-[70%] sm:w-full sm:max-w-[420px] max-w-[420px] moving-marginLeft bg-white rounded-xl outline-none shadow-[0_8px_32px_0_rgba(60,60,60,0.24),0_1.5px_4px_0_rgba(0,0,0,0.08)] z-50 overflow-hidden">
          <h4 className="mt-4 ml-4 font-bold pb-2">Search Results</h4>
          <div className="max-h-[360px] overflow-y-auto">
            {isLoading ? (
              <>
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="relative flex w-full h-fit border-t border-gray-300 box-border px-4 py-3"
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
              <div className="flex flex-col justify-center items-center h-[100px] border-t border-gray-300">
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
