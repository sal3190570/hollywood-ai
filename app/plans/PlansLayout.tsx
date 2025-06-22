"use client";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../components/UI Props/Sidebar";

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex relative overflow-x-hidden">
      {/* Mobile menu button */}
      <div className="md:hidden p-4 absolute right-0 top-0 z-40">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 w-[225px] h-dvh bg-white flex-col border-t border-x border-gray-200 z-30
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar />
      </div>
      {/* Main content */}
      <div className="flex-1 min-w-0 md:ml-[225px] min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
