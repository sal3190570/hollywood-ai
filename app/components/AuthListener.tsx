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
      unsubscribe();
    };
  }, [dispatch]);

  return null;
}
