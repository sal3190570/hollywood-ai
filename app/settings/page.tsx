import React from "react";
import SettingsLayout from "./SettingsLayout";
import SearchBar from "../components/UI Props/SearchBar";
import LogInModal from "../components/modals/LogInModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";

import SettingsTitle from "../components/SettingsTitle";
import SettingsContent from "../components/SettingsContent";

export default function page() {
  return (
    <>
      <SettingsLayout>
        {/* Always visible components */}
        <SearchBar />
        <SettingsTitle />
        <SettingsContent />

        <LogInModal />
        <SignUpModal />
        <ForgotPasswordModal />
      </SettingsLayout>
    </>
  );
}
