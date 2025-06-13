"use client";

import React from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { closeForgotPasswordModal } from "@/redux/slices/modalSlice";
import { Modal } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/16/solid";

export default function ForgotPasswordModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modals.forgotPasswordModalOpen
  );
  const dispatch: AppDispatch = useDispatch();

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

          <div className="ml-5 w-[340px]">
            <h2 className="text-[15px] text-blue-900 mb-2">Email Address</h2>
            <input
              type="email"
              placeholder="your@email.com"
              className="ml-12 w-[240px] h-8 outline-none"
            />
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              className="w-[300px] h-10 bg-purple-800 text-white font-semibold
              rounded-full cursor-pointer"
            >
              Send Instructions
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
