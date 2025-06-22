"use client";

import React from "react";

export default function ChoosePlanButton() {
  return (
    <>
      <button
        className="w-[90%] h-full bg-[#2E006B] text-white
                  cursor-pointer rounded-full "
        onClick={() => console.log("plan chosen")}
      >
        Choose Plan
      </button>
    </>
  );
}
