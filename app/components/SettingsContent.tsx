"use client";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import LoginProp from "./UI Props/LoginProp";

export default function SettingsContent() {
  const subscription = useSelector((state: RootState) => state.user.hasPremium);
  const email = useSelector((state: RootState) => state.user.email);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col relative mt-5 ml-8 moving-marginLeft">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Your Subscription Plan</h2>
            <span>{subscription === true ? "Premium" : "Basic"}</span>
          </div>
          {!subscription && (
            <div className="flex justify-start">
              <Link href="/plans">
                <button
                  className="w-[100px] h-[20px] bg-[#2E006B] flex justify-center items-center
          rounded-lg p-5 text-white text-sm font-semibold cursor-pointer
          mt-2 gap-1"
                >
                  Upgrade{" "}
                  <Image
                    src="/assets/bolt.svg"
                    height={10}
                    width={10}
                    alt="bolt icon"
                  />
                </button>
              </Link>
            </div>
          )}

          {/* Border between sections */}
          <div className="h-1 border-b-2 border-gray-200 w-[calc(100%-32px)] max-w-[95%] my-6"></div>

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Email</h2>
            <span>{email}</span>
          </div>
          <div className="h-1 border-b-2 border-gray-200 w-[calc(100%-32px)] max-w-[95%] my-6"></div>
        </div>
      ) : (
        <LoginProp text="Sign in to see your account settings" />
      )}
    </>
  );
}
