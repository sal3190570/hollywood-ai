"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeSearchModal } from "@/redux/slices/modalSlice";

export default function SearchModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modals.searchModalOpen
  );
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSearchModal())}
        className="absolute top-5 left-5 "
      >
        <div
          className="relative w-[600px] h-[600px]
         bg-white sm:rounded-xl outline-none"
        ></div>
      </Modal>
    </>
  );
}
