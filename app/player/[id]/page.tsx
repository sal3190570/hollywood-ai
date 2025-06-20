import React from "react";
import PlayerLayout from "../PlayerLayout";
import SearchBar from "@/app/components/SearchBar";
import LogInModal from "@/app/components/modals/LogInModal";
import SignUpModal from "@/app/components/modals/SignUpModal";
import ForgotPasswordModal from "@/app/components/modals/ForgotPasswordModal";

export default function page() {
  return (
    <>
      <PlayerLayout>
        {/* Always visible components */}
        <SearchBar />

        <div>Playing Movie!</div>
        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </PlayerLayout>
    </>
  );
}
