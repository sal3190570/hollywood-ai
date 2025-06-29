"use client";
import React, { useState } from "react";
import { loadCheckout } from "@/stripe/stripePayment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { openLogInModal } from "@/redux/slices/modalSlice";

export default function ChoosePlanButton({ priceId }: { priceId: string }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      dispatch(openLogInModal());
    } else {
      setLoading(true);
      loadCheckout(priceId);
    }
  };

  return (
    <>
      <button
        className="w-[90%] h-full bg-[#2E006B] text-white cursor-pointer rounded-full flex items-center justify-center "
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <div className="spinner border-white border-4 border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
        ) : (
          "Choose Plan"
        )}
      </button>

      <style jsx>{`
        .spinner {
          border-top-color: transparent;
          /* The rest of the border colors are white from Tailwind */
        }
      `}</style>
    </>
  );
}
