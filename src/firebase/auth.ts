import { app } from "./config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import type { SignupFormData, LoginFormData } from "@/schemas/authSchema";
import { createUserDocument, getUserDocument } from "./firestore";

export const firebaseAuth = getAuth(app);

export const signupUserWithEmailAndPassword = async (data: SignupFormData) => {
  const { email, password, name } = data;
  const userCredential = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );
  const user = userCredential?.user;
  await createUserDocument({
    uid: user.uid,
    data: {
      name,
      email,
      profileURL: ""
    },
  });
  return userCredential;
};

export const loginUserWithEmailAndPassword = async (data: LoginFormData) => {
  const { email, password } = data;
  const userCredential = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );
  const user = userCredential.user;
  const userData = await getUserDocument(user.uid);
  return {
    ...userCredential,
    userData,
  };
};

export const logoutUser = async () => {
  await signOut(firebaseAuth);
};


export const updateUserPassword = async (
  oldpassword: string,
  newpassword: string
) => {
  try {
    const currentUser = firebaseAuth.currentUser;

    if(!currentUser || !currentUser.email) {
      throw new Error("User not authenticated");
    }
    //1. Create credential using current email and old password
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      oldpassword
    );

    await reauthenticateWithCredential(
      currentUser,
      credential
    );

    await updatePassword(currentUser, newpassword);
    console.log("Password updated successfully!");

  } catch (error) {
    console.error("Password update failed:", error);
    throw error;
  }
}
