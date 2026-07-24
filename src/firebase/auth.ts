import { app } from "./config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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

export const logoutUser = async ()=> {
    await signOut(firebaseAuth);
}


