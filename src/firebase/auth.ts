import { app } from "./config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import type { SignupFormData, LoginFormData } from "@/schemas/authSchema";

const firebaseAuth = getAuth(app);

export const signupUserWithEmailAndPassword = async(data: SignupFormData)=> {
    const { email, password } = data;
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential;
}

export const loginUserWithEmailAndPassword = async(data: LoginFormData)=> {
    const { email, password } = data;
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential;
}
