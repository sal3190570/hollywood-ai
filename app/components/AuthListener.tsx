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
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFirestore: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          // Only set favourites for new users
          await setDoc(
            userRef,
            {
              name: currentUser.displayName || "",
              email: currentUser.email || "",
              isPremium: false,
              favourites: [],
            },
            { merge: true }
          );
        } else {
          // For existing users, only update name and email if they have changed
          // (optional: you can skip this if you don't want to update on every login)
          const currentData = userDoc.data();
          if (
            currentData?.name !== currentUser.displayName ||
            currentData?.email !== currentUser.email
          ) {
            await setDoc(
              userRef,
              {
                name: currentUser.displayName || "",
                email: currentUser.email || "",
              },
              { merge: true }
            );
          }
        }

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
