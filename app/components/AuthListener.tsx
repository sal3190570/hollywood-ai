// components/AuthListener.tsx
"use client";
import { useEffect } from "react";
import { auth } from "@/firebase";
import { signInUser, signOutUser } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      if (currentUser) {
        dispatch(
          signInUser({
            name: currentUser.displayName || "",
            username: currentUser.email ? currentUser.email.split("@")[0] : "",
            email: currentUser.email || "",
            uid: currentUser.uid,
          })
        );
      } else {
        dispatch(signOutUser());
      }
    });
    return () => {
      console.log("AuthListener cleanup");
      unsubscribe();
    };
  }, [dispatch]);

  return null; // This component does not render anything
}
