import { app } from "./config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import type { SignupFormData } from "@/schemas/authSchema";

const firebaseAuth = getAuth(app);

export const signupUserWithEmailAndPassword = async(data: SignupFormData)=> {
    const { email, password } = data;
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user.email;
}