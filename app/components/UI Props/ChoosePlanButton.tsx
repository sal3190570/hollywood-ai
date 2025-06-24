"use client";

import React from "react";
import { loadCheckout } from "@/stripe/stripePayment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { openLogInModal } from "@/redux/slices/modalSlice";

export default function ChoosePlanButton({ priceId }: { priceId: string }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const dispatch = useDispatch();
  const handleClick = () => {
    if (!isAuthenticated) {
      dispatch(openLogInModal());
    } else {
      loadCheckout(priceId);
    }
  };

  return (
    <>
      <button
        className="w-[90%] h-full bg-[#2E006B] text-white
                  cursor-pointer rounded-full "
        onClick={handleClick}
      >
        Choose Plan
      </button>
    </>
  );
}
