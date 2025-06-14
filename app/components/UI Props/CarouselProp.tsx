import { ClockIcon, StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

export default function CarouselProp() {
  return (
    <>
      <div className="flex flex-col relative h-[350px] bg-amber-300 w-[200px] ">
        <div className="flex ml-2 mt-8 ">
          <Image
            src={"/assets/summary.png"}
            height={300}
            width={180}
            alt="Movie Image"
            className="rounded-[4px] "
          />
        </div>
        <div className=" flex flex-col mt-2 ml-4">
          <h4 className="font-semibold text-black">Avatar</h4>
          <span className="text-xs text-gray-500">James Cameron</span>
          <div className="flex gap-4 mt-1">
            <div className="flex items-center text-xs gap-0.5 text-gray-500">
              <ClockIcon className="h-3" />
              <span>10:00</span>
            </div>
            <div className="flex items-center text-xs gap-0.5 text-gray-500">
              <StarIcon className="h-3" />
              <span>7.9</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
