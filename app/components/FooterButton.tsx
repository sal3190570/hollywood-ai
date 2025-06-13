"use client";

import React from "react";
import Image from "next/image";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { openLogInModal } from "@/redux/slices/modalSlice";

export default function FooterButton() {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <button
        onClick={() => dispatch(openLogInModal())}
        className="flex items-center justify-center gap-3
         text-white rounded-xl px-7 py-4 font-semibold
          bg-[#1a1a1a] transition-transform duration-300 hover:scale-110"
      >
        <span>Join HollywoodAI</span>
        <Image
          src="/assets/bolt.svg"
          alt=""
          width={14}
          height={14}
          className="w-[14px] h-auto"
        />
      </button>
    </>
  );
}
