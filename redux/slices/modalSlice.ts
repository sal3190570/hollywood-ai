import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  signUpModalOpen: false,
  logInModalOpen: false,
  forgotPasswordModalOpen: false,
};
const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false;
    },
    openLogInModal: (state) => {
      state.logInModalOpen = true;
    },
    closeLogInModal: (state) => {
      state.logInModalOpen = false;
    },
    openForgotPasswordModal: (state) => {
      state.forgotPasswordModalOpen = true;
    },
    closeForgotPasswordModal: (state) => {
      state.forgotPasswordModalOpen = false;
    },
  },
});
export const {
  openSignUpModal,
  closeSignUpModal,
  openLogInModal,
  closeLogInModal,
  openForgotPasswordModal,
  closeForgotPasswordModal,
} = modalSlice.actions;
export default modalSlice.reducer;
