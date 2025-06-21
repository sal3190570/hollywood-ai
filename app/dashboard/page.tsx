"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import LogInModal from "../components/modals/LogInModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import SearchBar from "../components/SearchBar";
import DashboardTitle from "../components/DashboardTitle";
import DashboardSelected from "../components/DashboardSelected";
import DashboardTop from "../components/DashboardTop";
import axios from "axios";
import { MovieItem } from "../dashboard/types";

export default function Dashboard() {
  const [selectedMovies, setSelectedMovies] = useState<MovieItem[]>([]);
  const [topMovies, setTopMovies] = useState<MovieItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [selectedRes, topRes] = await Promise.all([
          axios.get<{ data: MovieItem[] }>(
            "https://advanced-internship-api-production.up.railway.app/selectedMovies"
          ),
          axios.get<{ data: MovieItem[] }>(
            "https://advanced-internship-api-production.up.railway.app/topMovies"
          ),
        ]);
        setSelectedMovies(selectedRes.data.data);
        setTopMovies(topRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      {/* Always visible components */}

      <SearchBar />

      <DashboardTitle />

      {/* Pass isLoading to let the carousel handle skeletons */}
      <DashboardSelected
        selectedMovies={selectedMovies}
        isLoading={isLoading}
      />
      <DashboardTop topMovies={topMovies} isLoading={isLoading} />

      {/* Static modals */}
      <LogInModal />
      <SignUpModal />
      <ForgotPasswordModal />
    </DashboardLayout>
  );
}
