"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import { openLogInModal } from "@/redux/slices/modalSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
export default function HeaderButton() {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <button
        onClick={() => dispatch(openLogInModal())}
        className="px-[16px] py-[12px] font-semibold bg-black/10 flex justify-center items-center text-[17px] leading-[20px] gap-[16px] rounded-[48px] h-[64px] cursor-pointer hover:bg-black/20 transition-all duration-300"
      >
        <div className="w-[40px] h-[40px] p-[12px] rounded-full bg-white text-[#37393d] text-[10px] flex justify-center items-center">
          <FontAwesomeIcon
            icon={faPlay}
            className="w-[16px] h-[16px] text-[16px] flex justify-center items-center"
          />
        </div>
        <span className="text-white">See how it works &nbsp;</span>
      </button>
    </>
  );
}
