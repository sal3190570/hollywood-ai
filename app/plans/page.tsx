import React from "react";
import PlansLayout from "./PlansLayout";
import SearchBar from "../components/UI Props/SearchBar";
import LogInModal from "../components/modals/LogInModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";

export default function page() {
  return (
    <>
      <PlansLayout>
        {/* Always visible components */}
        <SearchBar />

        <div>Plans for Hollywood AI</div>
        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </PlansLayout>
    </>
  );
}
