import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  username: string;
  email: string;
  uid: string | null;
  isAuthenticated: boolean | null;
  hasPremium: boolean;
  lastLogin: number;
  isAuthLoading: boolean;
}

const initialState: UserState = {
  name: "",
  username: "",
  email: "",
  uid: null,
  isAuthenticated: null,
  hasPremium: false,
  lastLogin: 0,
  isAuthLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (
      state,
      action: PayloadAction<{
        name: string;
        username: string;
        email: string;
        uid: string;
      }>
    ) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.isAuthenticated = true;
      state.lastLogin = Date.now();
      state.isAuthLoading = false;
    },
    signOutUser: (state) => {
      state.name = "";
      state.username = "";
      state.email = "";
      state.uid = null;
      state.isAuthenticated = false;
      state.hasPremium = false;
      state.lastLogin = Date.now();
      state.isAuthLoading = false;
    },
    setPremiumStatus: (state, action: PayloadAction<boolean>) => {
      state.hasPremium = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { signInUser, signOutUser, setPremiumStatus, setAuthLoading } =
  userSlice.actions;
export default userSlice.reducer;
