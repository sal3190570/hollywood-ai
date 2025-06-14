import DashboardLayout from "./DashboardLayout";
import DbLoginModal from "../components/modals/DbLoginModal";

import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import SearchBar from "../components/SearchBar";
import DashboardTitle from "../components/DashboardTitle";
import DashboardSelected from "../components/DashboardSelected";
import DashboardTop from "../components/DashboardTop";
export default function Page() {
  return (
    <DashboardLayout>
      <SearchBar />
      <DashboardTitle />
      <DashboardSelected />
      <DashboardTop />
      <DbLoginModal />

      <SignUpModal />
      <ForgotPasswordModal />
    </DashboardLayout>
  );
}
