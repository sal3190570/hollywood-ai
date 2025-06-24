"use client";

import { openLogInModal } from "@/redux/slices/modalSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function SignInButton() {
  const dispatch: AppDispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(openLogInModal())}
      className="h-[40px] px-4 py-2.5 font-semibold text-gray-900 text-[15px] rounded-lg bg-white bg-opacity-10 hover:bg-black hover:text-white hover:scale-110 transition-all duration-200 ease-in-out"
    >
      Sign In
    </button>
  );
}
