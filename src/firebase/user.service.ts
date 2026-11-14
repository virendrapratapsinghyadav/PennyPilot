import { db } from  "./config.service";
import  { doc, serverTimestamp, setDoc, getDoc, updateDoc } from "firebase/firestore";
import type { createUserDocumentProps, UserDocument } from "@/types/user.types";


export const createUserDocument = async({uid, data}: createUserDocumentProps) => {
     try {
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, {
            ...data,
            createdAt: serverTimestamp()
        });
        console.log("Firestore user created successfully");
    } catch(error) {
        console.log("Firestore creation error:", error);
        throw error;
    }
}


export const getUserDocument = async(uid: string): Promise<UserDocument | null>=> {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if(userSnapshot.exists()){
        return {
            id: userSnapshot.id,
            ...(userSnapshot.data() as Omit<UserDocument, "id">)
        };
    }
    return null;
}


export const updateUserDocument = async (
  uid: string,
  user: Partial<Omit<UserDocument, "id">>
): Promise<void> => {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, user);
};

