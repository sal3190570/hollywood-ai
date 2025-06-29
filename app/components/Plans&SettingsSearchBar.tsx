"use client";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "./UI Props/SearchBar";

export default function Plans_Settings_SearchBar() {
  const allMovies = useSelector((state: RootState) => state.movies.allMovies);

  return (
    <>
      <SearchBar movies={allMovies} />
    </>
  );
}
