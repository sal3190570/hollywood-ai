import Feature from "./components/Feature";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeNavbar from "./components/HomeNavbar";
import ForgotPasswordModal from "./components/modals/ForgotPasswordModal";
import LogInModal from "./components/modals/LogInModal";
import SignUpModal from "./components/modals/SignUpModal";
import Steps from "./components/Steps";
import Summary from "./components/Summary";

export default function Home() {
  return (
    <>
      <HomeNavbar />
      <Header />
      <Feature />
      <Summary />
      <Steps />
      <Footer />
      <LogInModal />
      <SignUpModal />
      <ForgotPasswordModal />
    </>
  );
}
