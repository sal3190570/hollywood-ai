import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  signUpModalOpen: false,
  logInModalOpen: false,
  forgotPasswordModalOpen: false,
  dbLogInModalOpen: false,
  faLogInModalOpen: false,
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
    openDbLogInModal: (state) => {
      state.dbLogInModalOpen = true;
    },
    closeDbLogInModal: (state) => {
      state.dbLogInModalOpen = false;
    },
    openFaLogInModal: (state) => {
      state.faLogInModalOpen = true;
    },
    closeFaLogInModal: (state) => {
      state.faLogInModalOpen = false;
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
  openDbLogInModal,
  closeDbLogInModal,
  openFaLogInModal,
  closeFaLogInModal,
} = modalSlice.actions;
export default modalSlice.reducer;
