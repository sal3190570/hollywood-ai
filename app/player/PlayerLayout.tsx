"use client";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../components/UI Props/Sidebar";
import SearchBar from "../components/UI Props/SearchBar";
import PlayerProp from "../components/UI Props/PlayerProp";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          fixed z-40 inset-y-0 left-0 w-[225px] h-screen bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        <Sidebar />
      </div>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Mobile menu button */}
      <div className="md:hidden p-4 absolute right-0 top-0 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>
      {/* Main content */}
      <div
        className="
          absolute top-0 left-0 w-full h-full flex flex-col
          md:left-[225px] md:w-[calc(100vw-225px)]
        "
      >
        <SearchBar position="relative" />
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100vh - 80px - 80px)" }}
        >
          <div className="max-w-7xl w-full moving-marginLeft">{children}</div>
        </div>
      </div>
    </div>
  );
}
