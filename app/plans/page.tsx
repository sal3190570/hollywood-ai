import React from "react";
import PlansLayout from "./PlansLayout";

import LogInModal from "../components/modals/LogInModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import ComparePlans from "../components/ComparePlans";
import PlansTitle from "../components/PlansTitle";
import PlansAccordion from "../components/PlansAccordion";
import Plans_Settings_SearchBar from "../components/Plans&SettingsSearchBar";

export default function page() {
  return (
    <>
      <PlansLayout>
        <Plans_Settings_SearchBar />
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
