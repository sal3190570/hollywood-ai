"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  closeLogInModal,
  openForgotPasswordModal,
  openSignUpModal,
} from "@/redux/slices/modalSlice";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { UserIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import { signInUser } from "@/redux/slices/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function LogInModal() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [socialLoading, setSocialLoading] = useState<null | "google" | "guest">(
    null
  );
  const [loginLoading, setLoginLoading] = useState(false);
  const isOpen = useSelector((state: RootState) => state.modals.logInModalOpen);
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();

  async function handleGoogleLogin() {
    setSocialLoading("google");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      dispatch(closeLogInModal());
      if (pathname === "/") {
        router.push("/dashboard");
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSocialLoading(null);
    }
  }

  async function handleGuestLogin() {
    setSocialLoading("guest");
    try {
      await signInWithEmailAndPassword(
        auth,
        "guest123450000@gmail.com",
        "123456"
      );
      dispatch(closeLogInModal());
      if (pathname === "/") {
        router.push("/dashboard");
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSocialLoading(null);
    }
  }

  async function handleLogin() {
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(closeLogInModal());
      if (pathname === "/") {
        router.push("/dashboard");
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoginLoading(false);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      // --- FIX: Always use a string for email ---
      const email = currentUser.email ?? "";
      const username = email ? email.split("@")[0] : "";
      dispatch(
        signInUser({
          name: "",
          username,
          email,
          uid: currentUser.uid,
        })
      );
    });
    return unsubscribe;
  }, []);

  // Spinner SVG (Tailwind CSS)
  function Spinner({ color = "black" }) {
    return (
      <svg
        className={`animate-spin h-5 w-5 text-${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLogInModal())}
        className="flex justify-center items-center "
      >
        <div className="relative w-full h-full sm:w-[380px] sm:h-[600px] bg-white sm:rounded-xl outline-none">
          <XMarkIcon
            className="absolute right-2 w-7 mt-2 ml-5 cursor-pointer"
            onClick={() => dispatch(closeLogInModal())}
          />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="flex justify-center text-4xl font-bold"> Log In</h1>
            <div className="flex flex-col justify-center items-center">
              {errorMessage && (
                <span className="text-red-500 text-sm mt-2">
                  {errorMessage}
                </span>
              )}

              <div className="flex flex-col w-[200px] h-fit space-y-8 mt-6 text-[15px] text-gray-800 mr-20">
                <button
                  className="cursor-pointer w-[200px] flex items-center justify-center transition-all duration-200 hover:-translate-y-1 disabled:opacity-60 relative"
                  onClick={handleGoogleLogin}
                  disabled={!!socialLoading || loginLoading}
                >
                  <span className="absolute left-[calc(50%-60px)] flex items-center">
                    <Image
                      src={"/assets/google.svg"}
                      height={18}
                      width={18}
                      alt="Google Logo"
                    />
                  </span>
                  <span className="ml-[60px]">
                    {socialLoading === "google" ? (
                      <Spinner />
                    ) : (
                      "Login with Google"
                    )}
                  </span>
                </button>
                <button
                  className="cursor-pointer w-[200px] flex items-center justify-center transition-all duration-200 hover:-translate-y-1 disabled:opacity-60 relative"
                  onClick={handleGuestLogin}
                  disabled={!!socialLoading || loginLoading}
                >
                  <span className="absolute left-[calc(50%-60px)] flex items-center">
                    <UserIcon className="w-[20px] h-[20px]" />
                  </span>
                  <span className="ml-[60px]">
                    {socialLoading === "guest" ? <Spinner /> : "Login As Guest"}
                  </span>
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
                    dispatch(closeLogInModal());
                    dispatch(openForgotPasswordModal());
                  }}
                  className="absolute right-5 text-purple-800 cursor-pointer"
                >
                  Forgot Password?
                </span>
              </div>
              <button
                className="w-[300px] h-10 bg-[#2E006B] mt-10 text-white font-semibold rounded-full cursor-pointer flex items-center justify-center disabled:opacity-60"
                onClick={async () => {
                  if (!loginLoading && !socialLoading) {
                    await handleLogin();
                  }
                }}
                disabled={!!socialLoading || loginLoading}
              >
                {loginLoading ? (
                  <span className="flex items-center">
                    <Spinner color="white" />
                    <span className="ml-3">Logging In...</span>
                  </span>
                ) : (
                  "Log In"
                )}
              </button>
              <div className="flex text-xs mt-3">
                <span>
                  Dont have an account yet?
                  <span
                    onClick={() => {
                      dispatch(closeLogInModal());
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
