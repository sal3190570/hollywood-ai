"use client";
import { ClockIcon, StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import { MovieItemWithDuration } from "@/app/types";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function CarouselProp({
  item,
}: {
  item?: MovieItemWithDuration | null;
}) {
  // Format time as MM:SS, safely handling null/undefined
  const formatTime = (time: number | null | undefined) => {
    if (time == null || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const hasPremium = useSelector((state: RootState) => state.user.hasPremium);
  const showPremiumLabel = item?.subscriptionRequired && !hasPremium;

  // Skeleton loading state
  if (!item) {
    return (
      <div className="flex flex-col relative h-[400px] max-w-[180px] mx-auto rounded-xl overflow-hidden">
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
    <Link
      href={`/movie/${item.id}`}
      aria-label={`View details for ${item.title}`}
    >
      <div className="flex flex-col relative h-[400px] max-w-[180px] mx-auto rounded-xl overflow-hidden">
        <div className="flex mt-6 justify-center relative">
          {showPremiumLabel && (
            <div
              className="absolute -top-2 flex justify-center items-center h-[20px] w-[60px] rounded-full z-10"
              style={{ background: "rgba(46, 16, 101, 0.75)" }}
            >
              <span className="text-white text-[10px] ">Premium</span>
            </div>
          )}

          {item.imageLink ? (
            <Image
              src={item.imageLink}
              height={220}
              width={160}
              alt={item.title}
              className="rounded-xl object-cover"
              style={{ background: "#eee" }}
              priority
            />
          ) : (
            <div className="h-[220px] w-[160px] bg-gray-200 rounded-xl" />
          )}
        </div>
        <div className="flex flex-col mt-4 px-4">
          <h4 className="font-semibold text-black text-base leading-tight">
            {item.title}
          </h4>
          <span className="text-xs text-gray-700">{item.director}</span>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center text-xs gap-1 text-gray-700">
              <ClockIcon className="h-4 w-4" />
              <span>{formatTime(item.duration)}</span>
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
