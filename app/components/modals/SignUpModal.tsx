"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeSignUpModal, openLogInModal } from "@/redux/slices/modalSlice";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { UserIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import { signInUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function SignUpModal() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isOpen = useSelector(
    (state: RootState) => state.modals.signUpModalOpen
  );
  const dispatch: AppDispatch = useDispatch();

  async function handleGoogleSignUp() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(closeSignUpModal());
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  }

  async function handleSignUp() {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(closeSignUpModal());
      router.push("/dashboard");
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
        case "auth/email-already-in-use":
          return "This email is already in use.";
        case "auth/weak-password":
          return "Password is too weak.";
        default:
          return "An error occurred. Please try again.";
      }
    }
    return String(error);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        signInUser({
          name: "",
          username: currentUser.email!.split("@")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
        className="flex justify-center items-center"
      >
        <div
          className="relative w-full h-full sm:w-[380px] sm:h-[600px]
         bg-white sm:rounded-xl outline-none"
        >
          <XMarkIcon
            className="absolute right-2 w-7 mt-2 ml-5 cursor-pointer"
            onClick={() => dispatch(closeSignUpModal())}
          />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="flex justify-center text-4xl font-bold">Sign Up</h1>
            <div className="flex flex-col justify-center items-center">
              {errorMessage && (
                <span className="text-red-500 text-sm mt-4">
                  {errorMessage}
                </span>
              )}
              <div
                className="flex flex-col w-[200px] h-fit
               space-y-8 mt-8 text-[15px] text-gray-800 mr-20"
              >
                <button
                  className="cursor-pointer w-[200px] flex gap-3 items-center
                transition-all duration-200 hover:-translate-y-1"
                  onClick={() => handleGoogleSignUp()}
                >
                  <span>
                    <Image
                      src={"/assets/google.svg"}
                      height={18}
                      width={18}
                      alt="Google Logo"
                    />
                  </span>
                  Sign up with Google
                </button>
                <button
                  className="cursor-pointer w-[200px] flex gap-3 items-center
                transition-all duration-200 hover:-translate-y-1"
                >
                  <span>
                    <UserIcon className="w-[20px] h-[20px]" />
                  </span>
                  Login as Guest
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
                    />{" "}
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-7 h-7 text-gray-400 cursor-pointer"
                    >
                      {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="w-[300px] h-10 bg-purple-800 mt-2 text-white font-semibold
              rounded-full cursor-pointer"
                onClick={() => handleSignUp()}
              >
                Sign Up
              </button>
              <div className="flex text-xs mt-3">
                <span>
                  Already have an account?
                  <span
                    onClick={() => {
                      dispatch(closeSignUpModal());
                      dispatch(openLogInModal());
                    }}
                    className="text-purple-800 underline underline-offset-1 ml-1"
                  >
                    Log In
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
