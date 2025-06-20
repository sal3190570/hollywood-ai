import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
  uid: "",
  isAuthenticated: false,
  hasPremium: false,
  lastLogin: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.isAuthenticated = true;
      state.lastLogin = Date.now();
    },

    signOutUser: (state) => {
      state.name = "";
      state.username = "";
      state.email = "";
      state.uid = "";
      state.isAuthenticated = false;
      state.hasPremium = false;
      state.lastLogin = Date.now();
    },
    
    setPremiumStatus: (state, action) => {
      state.hasPremium = action.payload;
    },
  },
});

export const { signInUser, signOutUser, setPremiumStatus } = userSlice.actions;

export default userSlice.reducer;
