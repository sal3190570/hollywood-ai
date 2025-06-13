"use client";
import React, { useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  closeFaLogInModal,
  openForgotPasswordModal,
  openSignUpModal,
} from "@/redux/slices/modalSlice";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { UserIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";

import { FirebaseError } from "firebase/app";

export default function LogInModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isOpen = useSelector(
    (state: RootState) => state.modals.faLogInModalOpen
  );
  const dispatch: AppDispatch = useDispatch();

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(closeFaLogInModal());
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  }

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(closeFaLogInModal());
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  }

  async function handleGuestLogin() {
    try {
      await signInWithEmailAndPassword(
        auth,
        "guest123450000@gmail.com",
        "123456"
      );
      dispatch(closeFaLogInModal());
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  }

  function getErrorMessage(error: unknown): string {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          return "Popup closed before sign-in completed.";
        case "auth/invalid-email":
          return "Invalid email address.";
        case "auth/user-not-found":
          return "User not found.";
        case "auth/wrong-password":
          return "Incorrect password.";
        default:
          return "An error occurred. Please try again.";
      }
    }
    return String(error);
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeFaLogInModal())}
        className="flex justify-center items-center "
      >
        <div
          className="relative w-full h-full sm:w-[380px] sm:h-[600px]
         bg-white sm:rounded-xl outline-none"
        >
          <XMarkIcon
            className="absolute right-2 w-7 mt-2 ml-5 cursor-pointer"
            onClick={() => dispatch(closeFaLogInModal())}
          />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="flex justify-center text-4xl font-bold"> Log In</h1>
            <div className="flex flex-col justify-center items-center">
              {errorMessage && (
                <span className="text-red-500 text-sm mt-2">
                  {errorMessage}
                </span>
              )}

              <div
                className="flex flex-col w-[200px] h-fit
               space-y-8 mt-6 text-[15px] text-gray-800 mr-20"
              >
                <button
                  className="cursor-pointer w-[200px] flex gap-3 items-center
                 transition-all duration-200 hover:-translate-y-1"
                  onClick={() => handleGoogleLogin()}
                >
                  <span>
                    <Image
                      src={"/assets/google.svg"}
                      height={18}
                      width={18}
                      alt="Google Logo"
                    />
                  </span>
                  Login with Google
                </button>
                <button
                  className="cursor-pointer w-[200px] flex gap-3 items-center
                 transition-all duration-200 hover:-translate-y-1"
                  onClick={() => handleGuestLogin()}
                >
                  <span>
                    <UserIcon className="w-[20px] h-[20px]" />
                  </span>
                  Login As Guest
                </button>
              </div>
              <span className="mt-8 text-sm text-gray-500"> or </span>

              <div className="mt-8 space-y-4 text-sm">
                <div className="w-[340px]">
                  <h2 className="text-[15px]  text-blue-900 mb-2">
                    Email Address
                  </h2>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="ml-12 w-[240px] h-8 outline-none"
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrorMessage("");
                    }}
                    value={email}
                  />
                </div>
                <div className="w-[340px] mb-6">
                  <h2 className="text-[15px] text-blue-900 mb-4">Password</h2>
                  <div className="flex">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      className="ml-12 w-[240px] h-8 outline-none"
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setErrorMessage("");
                      }}
                      value={password}
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-7 h-7 text-gray-400 cursor-pointer"
                    >
                      {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </div>
                  </div>
                </div>
                <span
                  onClick={() => {
                    dispatch(closeFaLogInModal());
                    dispatch(openForgotPasswordModal());
                  }}
                  className="absolute right-5 text-purple-800 cursor-pointer"
                >
                  Forgot Password?
                </span>
              </div>
              <button
                className="w-[300px] h-10 bg-purple-800 mt-10 text-white font-semibold
              rounded-full cursor-pointer"
                onClick={() => handleLogin()}
              >
                Log In
              </button>
              <div className="flex text-xs mt-3">
                <span>
                  Dont have an account yet?
                  <span
                    onClick={() => {
                      dispatch(closeFaLogInModal());
                      dispatch(openSignUpModal());
                    }}
                    className="text-purple-800 underline underline-offset-1 ml-1"
                  >
                    Sign Up
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
