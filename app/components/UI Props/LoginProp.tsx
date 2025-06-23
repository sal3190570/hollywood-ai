import { openLogInModal } from "@/redux/slices/modalSlice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

export default function LoginProp({ text }: { text: string }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="mt-2 w-full h-[400px] flex flex-col justify-center items-center relative">
        <Image
          src={"/assets/login.webp"}
          height={200}
          width={450}
          alt="Login Photo"
        />
        <h2 className="text-2xl font-bold pb-4">{text}</h2>
        <button
          className="w-[150px] h-fit py-2
          cursor-pointer bg-[#2E006B] text-white rounded-lg"
          onClick={() => dispatch(openLogInModal())}
        >
          Login
        </button>
      </div>
    </>
  );
}
