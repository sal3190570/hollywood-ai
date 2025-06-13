import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
  uid: "",
  isAuthenticated: false,
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
      state.lastLogin = Date.now(); // Add a timestamp
    },

    signOutUser: (state) => {
      state.name = "";
      state.username = "";
      state.email = "";
      state.uid = "";
      state.isAuthenticated = false;
      state.lastLogin = Date.now();
    },
  },
});

export const { signInUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
