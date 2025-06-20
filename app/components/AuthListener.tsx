"use client";
import { useEffect } from "react";
import { auth } from "@/firebase";
import {
  signInUser,
  signOutUser,
  setPremiumStatus,
} from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFirestore: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        // Ensure the user document exists
        await setDoc(
          userRef,
          {
            name: currentUser.displayName || "",
            email: currentUser.email || "",
            isPremium: false, // Default value
            favourites: [], // Default value
          },
          { merge: true }
        );
        unsubscribeFirestore = onSnapshot(userRef, (doc) => {
          const data = doc.data();
          dispatch(
            signInUser({
              name: currentUser.displayName || "",
              username: currentUser.email
                ? currentUser.email.split("@")[0]
                : "",
              email: currentUser.email || "",
              uid: currentUser.uid,
            })
          );
          dispatch(setPremiumStatus(data?.isPremium || false));
        });
      } else {
        if (unsubscribeFirestore) unsubscribeFirestore();
        dispatch(signOutUser());
        dispatch(setPremiumStatus(false));
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, [dispatch]);

  return null;
}
