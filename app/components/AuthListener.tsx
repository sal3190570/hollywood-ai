"use client";
import { useEffect } from "react";
import { auth } from "@/firebase";
import {
  signInUser,
  signOutUser,
  setPremiumStatus,
  setAuthLoading,
} from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeUser: (() => void) | null = null;

    dispatch(setAuthLoading(true));

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
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

        // Check for active Stripe subscriptions
        const subscriptionsRef = collection(
          db,
          "customers",
          currentUser.uid,
          "subscriptions"
        );
        const q = query(
          subscriptionsRef,
          where("status", "in", ["active", "trialing"])
        );
        const subscriptionDocs = await getDocs(q);
        const hasActiveSubscription = !subscriptionDocs.empty;

        await setDoc(
          userRef,
          { isPremium: hasActiveSubscription },
          { merge: true }
        );

        // Set up onSnapshot and set loading to false only after user data is in Redux
        unsubscribeUser = onSnapshot(userRef, (doc) => {
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
          dispatch(setAuthLoading(false));
        });

        dispatch(setPremiumStatus(hasActiveSubscription));
      } else {
        if (unsubscribeUser) unsubscribeUser();
        dispatch(signOutUser());
        dispatch(setPremiumStatus(false));
        dispatch(setAuthLoading(false));
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) unsubscribeUser();
    };
  }, [dispatch]);

  return null;
}
