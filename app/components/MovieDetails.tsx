import React, { useEffect, useState } from "react";
import { MovieItem } from "../types";
import Image from "next/image";
import { ClockIcon, StarIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BoltIcon, MicrophoneIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { openLogInModal } from "@/redux/slices/modalSlice";
import { useRouter } from "next/navigation";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "@mui/material";

export default function MovieDetails({
  movieData,
  isLoading,
  error,
  movieDuration,
}: {
  movieData: MovieItem;
  isLoading?: boolean;
  error: string;
  movieDuration: number | null;
}) {
  const [isFavourite, setIsFavourite] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const hasPremium = useSelector((state: RootState) => state.user.hasPremium);
  const userId = useSelector((state: RootState) => state.user.uid);
  const dispatch = useDispatch();
  const router = useRouter();

  const formatTime = (time: number | null | undefined) => {
    if (time == null || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  async function handleFavourite() {
    if (!isAuthenticated) {
      dispatch(openLogInModal());
      return;
    }
    // --- FIX: Ensure userId is a string ---
    if (typeof userId !== "string" || !userId) return;
    const userRef = doc(db, "users", userId);
    try {
      if (isFavourite) {
        await updateDoc(userRef, {
          favourites: arrayRemove(movieData.id),
        });
      } else {
        await updateDoc(userRef, {
          favourites: arrayUnion(movieData.id),
        });
      }
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  }

  function handleSummarise() {
    if (isAuthenticated) {
      checkPremium();
    } else {
      dispatch(openLogInModal());
    }
  }

  function checkPremium() {
    if (movieData.subscriptionRequired) {
      if (hasPremium) {
        router.push(`/player/${movieData.id}`);
      } else {
        router.push("/plans");
      }
    } else {
      router.push(`/player/${movieData.id}`);
    }
  }

  useEffect(() => {
    // --- FIX: Ensure userId is a string ---
    if (isAuthenticated && typeof userId === "string" && userId) {
      const userRef = doc(db, "users", userId);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        const data = doc.data();
        if (data && data.favourites) {
          setIsFavourite(data.favourites.includes(movieData.id));
        }
      });
      return () => unsubscribe();
    }
  }, [isAuthenticated, userId, movieData.id]);

  if (isLoading) {
    return (
      <div className="w-full relative flex flex-col-reverse items-center lg:items-start lg:flex-row">
        <div className="flex flex-col w-full max-w-5xl moving-marginLeft">
          {/* Title & Director */}
          <div className="flex flex-col gap-2 ml-8 mt-8 border-b pb-6 border-b-gray-300">
            <Skeleton
              variant="text"
              width="80%"
              height={48}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="text"
              width="40%"
              height={20}
              sx={{ borderRadius: 1 }}
            />
          </div>
          {/* Stats Row */}
          <div className="flex mt-2 ml-8 border-b pb-10 border-b-gray-300">
            <div className="flex flex-col gap-2 h-[25px] w-[180px] mt-2">
              <Skeleton
                variant="rectangular"
                width="80%"
                height={20}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width="60%"
                height={20}
                sx={{ borderRadius: 1 }}
              />
            </div>
            <div className="flex flex-col gap-2 h-[25px] w-[200px] justify-between mt-2">
              <Skeleton
                variant="rectangular"
                width="80%"
                height={20}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width="60%"
                height={20}
                sx={{ borderRadius: 1 }}
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="h-[100px] w-[250px] ml-8 mt-6 flex flex-col">
            <Skeleton
              variant="rectangular"
              width="100%"
              height={40}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width="80%"
              height={24}
              sx={{ mt: 2, borderRadius: 1 }}
            />
          </div>
          {/* Description & Tags */}
          <div className="flex flex-col ml-8 mt-4">
            <Skeleton
              variant="text"
              width="30%"
              height={28}
              sx={{ borderRadius: 1 }}
            />
            <div className="flex gap-4 mt-4 ml-1">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={70}
                  height={32}
                  sx={{ borderRadius: 1 }}
                />
              ))}
            </div>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={80}
              sx={{ mt: 2, borderRadius: 1 }}
            />
          </div>
        </div>
        {/* Image */}
        <div className="flex ml-8 mt-10 justify-center w-[180px] h-[266px]">
          <Skeleton
            variant="rectangular"
            width={180}
            height={266}
            sx={{ borderRadius: 2.5 }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <div className="w-full relative flex flex-col-reverse items-center lg:items-start lg:flex-row">
        <div className="flex flex-col w-full max-w-5xl moving-marginLeft">
          <div className="flex flex-col gap-2 ml-8 mt-8 border-b pb-6 border-b-gray-300">
            <h1 className="text-4xl font-semibold">
              {movieData.title}{" "}
              {movieData.subscriptionRequired ? "(Premium)" : ""}
            </h1>
            <h2 className="text-sm text-gray-500">{movieData.director}</h2>
          </div>
          <div className="flex mt-2 ml-8 border-b pb-10 border-b-gray-300">
            <div className="flex flex-col gap-2 h-[25px] w-[180px] mt-2">
              <div className="flex items-center text-[14px] gap-1 text-black">
                <StarIcon className="h-4 w-4" />
                <span>{movieData.rating} / 10</span>
              </div>
              <div className="flex items-center text-[14px] gap-1 text-black">
                <MicrophoneIcon className="h-4 w-4" />
                <span> {movieData.type}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 h-[25px] w-[200px] justify-between mt-2">
              <div className="flex items-center text-[14px] gap-1 text-black">
                <ClockIcon className="h-4 w-4" />
                <span> {formatTime(movieDuration)}</span>
              </div>
              <div className="flex items-center text-[14px] gap-1 text-black">
                <CalendarIcon className="h-4 w-4" />
                <span>{movieData.releaseYear}</span>
              </div>
            </div>
          </div>
          <div className="h-[100px] w-[250px] ml-8 mt-6 flex flex-col">
            <button
              className="flex gap-1 items-center rounded-[4px] text-white bg-indigo-900 justify-center h-[40px] w-full cursor-pointer"
              onClick={handleSummarise}
            >
              <span className="font-semibold">Summarise</span>
              <BoltIcon className="h-[14px] w-[14px]" />
            </button>
            <button
              onClick={handleFavourite}
              className="flex items-center gap-2 mt-5 cursor-pointer w-fit text-blue-600 font-semibold"
            >
              {isFavourite ? (
                <>
                  <BookmarkIconSolid className="h-5 w-5" />
                  <span>Remove from Favourites</span>
                </>
              ) : (
                <>
                  <BookmarkIconOutline className="h-5 w-5" />
                  <span>Add to Favourites</span>
                </>
              )}
            </button>
          </div>
          <div className="flex flex-col ml-8 mt-4">
            <h3 className="font-semibold text-lg">Whats it about?</h3>
            <div className="flex gap-4 mt-4 ml-1">
              {movieData.tags.map((tag, i) => (
                <div
                  className="flex justify-center items-center h-fit w-fit p-3 bg-gray-100 rounded-[4px] text-sm font-medium"
                  key={i}
                >
                  <span>{tag}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[16px]">{movieData.movieDescription}</p>
          </div>
        </div>
        <div className="flex ml-8 mt-10 justify-center w-[180px] h-[266px]">
          {movieData.imageLink && (
            <Image
              src={movieData.imageLink}
              width={180}
              height={266}
              alt={`${movieData.title} Image`}
              className="rounded-xl"
              priority
            />
          )}
        </div>
      </div>
    </>
  );
}
