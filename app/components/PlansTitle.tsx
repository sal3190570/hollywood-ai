import React from "react";

export default function PlansTitle() {
  return (
    <>
      <div className="flex flex-col relative justify-center w-full h-[110px] outline outline-gray-200">
        <div className=" ml-8 moving-marginLeft">
          <h1 className="text-[28px] font-bold">Plans</h1>
          <p className="text-gray-500 text-sm leading-tight">
            Get unlimited access to our extensive library of movie summaries.
          </p>
        </div>
      </div>
    </>
  );
}
