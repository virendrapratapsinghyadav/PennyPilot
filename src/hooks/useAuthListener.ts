import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/firebase/auth.service";

import { getUserDocument } from "@/firebase/user.service";

import { useUserStore } from "@/store/user.store";


export const useAuthListener = () => {

  const setUser = useUserStore(state => state.setUser);
  const clearUser = useUserStore(state => state.clearUser);
  const setLoading = useUserStore(state => state.setLoading);

  useEffect(() => {

    let active = true;

    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (currentUser) => {

        if (!currentUser) {
          if (active) {
            clearUser();
            setLoading(false);
          }

          return;
        }

        try {

          const profile = await getUserDocument(currentUser.uid);

          if (!active) return;

          setUser({
            id: currentUser.uid,
            name: profile?.name ?? "",
            email: currentUser.email ?? "",
            profileURL: profile?.profileURL ?? ""
          });

        } catch (error) {

          console.error("Failed to fetch user profile:", error);

          if (active) {
            // Firebase Auth is still valid.
            // Do not confuse Firestore errors with logout.
            setUser({
              id: currentUser.uid,
              name: "",
              email: currentUser.email ?? "",
              profileURL: ""
            });
          }

        } finally {

          if (active) {
            setLoading(false);
          }
        }
      }
    );

    return () => {
      active = false;
      unsubscribe();
    };

  }, [setUser, clearUser, setLoading]);
};