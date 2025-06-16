import FavouritesLayout from "./FavouritesLayout";
import LogInModal from "../components/modals/LogInModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import SearchBar from "../components/SearchBar";

export default function Page() {
  return (
    <FavouritesLayout>
      <SearchBar />

      <LogInModal />
      <SignUpModal />
      <ForgotPasswordModal />
    </FavouritesLayout>
  );
}
