import React from "react";
import PlansLayout from "./PlansLayout";
import SearchBar from "../components/UI Props/SearchBar";
import LogInModal from "../components/modals/LogInModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import ComparePlans from "../components/ComparePlans";
import PlansTitle from "../components/PlansTitle";
import PlansAccordion from "../components/PlansAccordion";

export default function page() {
  return (
    <>
      <PlansLayout>
        {/* Always visible components */}
        <SearchBar />
        <PlansTitle />
        <ComparePlans />
        <PlansAccordion />
        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </PlansLayout>
    </>
  );
}
