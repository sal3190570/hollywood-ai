"use client";

import { ClockIcon, StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import { MovieItem } from "@/app/dashboard/types";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

export default function CarouselProp({ item }: { item?: MovieItem | null }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  // Skeleton loading state
  if (!item) {
    return (
      <div className="flex flex-col relative h-[400px] w-[180px]  rounded-xl overflow-hidden">
        <div className="flex mt-6 justify-center">
          <Skeleton
            variant="rectangular"
            width={160}
            height={220}
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col mt-4 px-4">
          <Skeleton variant="text" width={140} height={24} />
          <Skeleton variant="text" width={100} height={16} className="mt-1" />
          <div className="flex gap-4 mt-2">
            <Skeleton variant="text" width={40} height={18} />
            <Skeleton variant="text" width={40} height={18} />
          </div>
        </div>
      </div>
    );
  }

  // Real card
  return (
    <Link href={`/movie/${item.id}`}>
      <div className="flex flex-col relative h-[400px] w-[180px] rounded-xl overflow-hidden">
        <div className="flex mt-6 justify-center relative">
          {item.subscriptionRequired && (
            <div className="absolute -top-2 flex justify-center items-center h-[25px] w-[80px] rounded-full opacity-90 bg-purple-700 z-10">
              <span className="text-white text-xs font-semibold">Premium</span>
            </div>
          )}
          <Image
            src={item.imageLink}
            height={220}
            width={160}
            alt={item.title}
            className="rounded-xl object-cover"
            style={{ background: "#eee" }}
          />
        </div>
        <div className="flex flex-col mt-4 px-4">
          <h4 className="font-semibold text-black text-base leading-tight truncate">
            {item.title}
          </h4>
          <span className="text-xs text-gray-700">{item.director}</span>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center text-xs gap-1 text-gray-700">
              <ClockIcon className="h-4 w-4" />
              <span>{/* Add duration here if available */}</span>
            </div>
            <div className="flex items-center text-xs gap-1 text-gray-700">
              <StarIcon className="h-4 w-4" />
              <span>{item.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
