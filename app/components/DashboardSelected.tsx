import React from "react";
import Carousel from "../components/Carousel";

export default function DashboardSelected() {
  return (
    <>
      <div className="flex flex-col h-[450px] w-full ">
        <div className="flex flex-col mt-10 ml-10 moving-marginLeft">
          <h2 className="text-[22px] font-bold">Selected just for you</h2>
          <p className="text-gray-500 text-sm leading-tight">
            We think you'll like these.
          </p>
        </div>
        <div className="flex max-w-[1200px] moving-marginLeft ml-10">
          <Carousel />
        </div>
      </div>
    </>
  );
}
