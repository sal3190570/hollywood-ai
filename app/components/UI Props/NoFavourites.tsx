import React from "react";

export default function NoFavourites() {
  return (
    <>
      <div
        className="w-[300px] h-[100px] bg-gray-200
      flex flex-col justify-center items-center mt-8 px-3 rounded-xl"
      >
        <h2 className="font-bold pb-1">Save your favorite movies!</h2>
        <span className="text-sm">
          When you save a movie, it will apear here.
        </span>
      </div>
    </>
  );
}
