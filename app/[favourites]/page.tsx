import FavouritesLayout from "./FavouritesLayout";
import FaLoginModal from "../components/modals/FaLoginModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import SearchBar from "../components/SearchBar";

export default function Page() {
  return (
    <FavouritesLayout>
      <SearchBar />

      <FaLoginModal />
      <SignUpModal />
      <ForgotPasswordModal />
    </FavouritesLayout>
  );
}
