import React from "react";

export default function DashboardTitle() {
  return (
    <>
      <div className="flex flex-col relative justify-center w-full h-[110px] outline outline-gray-200">
        <div className=" ml-8 moving-marginLeft">
          <h1 className="text-[32px] font-bold">AI Movie Summariser</h1>
          <p className="text-gray-500 text-sm leading-tight">
            Enjoy high-quality summaries of your favourite movies instantly
            without breaking a sweat
          </p>
        </div>
      </div>
    </>
  );
}
