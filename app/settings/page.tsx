import React from "react";
import SettingsLayout from "./SettingsLayout";
import LogInModal from "../components/modals/LogInModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import SettingsTitle from "../components/SettingsTitle";
import SettingsContent from "../components/SettingsContent";
import Plans_Settings_SearchBar from "../components/Plans&SettingsSearchBar";

export default function page() {
  return (
    <>
      <SettingsLayout>
        <Plans_Settings_SearchBar />
        <SettingsTitle />
        <SettingsContent />

        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </SettingsLayout>
    </>
  );
}
