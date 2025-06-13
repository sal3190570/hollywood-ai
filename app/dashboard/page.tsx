import DashboardLayout from "./DashboardLayout";
import DbLoginModal from "../components/modals/DbLoginModal";

import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import SearchBar from "../components/SearchBar";
export default function Page() {
  return (
    <DashboardLayout>
      <SearchBar />
      <DbLoginModal />

      <SignUpModal />
      <ForgotPasswordModal />
    </DashboardLayout>
  );
}
