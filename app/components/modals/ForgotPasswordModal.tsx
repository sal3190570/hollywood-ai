"use client";
import React, { useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { closeForgotPasswordModal } from "@/redux/slices/modalSlice";
import { Modal } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";

export default function ForgotPasswordModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modals.forgotPasswordModalOpen
  );
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSendInstructions() {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Check your inbox.");
      // Optional: close modal after a delay
      setTimeout(() => {
        dispatch(closeForgotPasswordModal());
      }, 3000);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      // Firebase errors have a code property
      if ("code" in error) {
        switch (error.code) {
          case "auth/invalid-email":
            return "Invalid email address.";
          case "auth/user-not-found":
            return "No user found with this email.";
          default:
            return "Failed to send instructions. Please try again.";
        }
      }
      return "Failed to send instructions. Please try again.";
    }
    return "Failed to send instructions. Please try again.";
  }

  // Spinner SVG (Tailwind CSS)
  function Spinner({ color = "white" }) {
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
        onClose={() => dispatch(closeForgotPasswordModal())}
        className="flex justify-center items-center"
      >
        <div
          className="relative w-full h-full sm:w-[380px] sm:h-[600px]
         bg-white sm:rounded-xl outline-none"
        >
          <XMarkIcon
            className="absolute right-2 w-7 mt-2 ml-5 cursor-pointer"
            onClick={() => dispatch(closeForgotPasswordModal())}
          />
          <div className="pt-10 pb-6 px-4 sm:px-20">
            <h1 className="flex justify-center text-4xl font-bold whitespace-nowrap">
              Forgot Password
            </h1>
          </div>

          {errorMessage && (
            <span className="text-red-500 text-sm mt-2 flex justify-center">
              {errorMessage}
            </span>
          )}
          {successMessage && (
            <span className="text-green-500 text-sm mt-2 flex justify-center">
              {successMessage}
            </span>
          )}

          <div className="ml-5 w-[340px]">
            <h2 className="text-[15px] text-blue-900 mb-2">Email Address</h2>
            <input
              type="email"
              placeholder="your@email.com"
              className="ml-12 w-[240px] h-8 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              className="w-[300px] h-10 bg-purple-800 text-white font-semibold
              rounded-full cursor-pointer flex items-center justify-center disabled:opacity-60"
              onClick={handleSendInstructions}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <Spinner color="white" />
                  <span className="ml-3">Sending...</span>
                </span>
              ) : (
                "Send Instructions"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
