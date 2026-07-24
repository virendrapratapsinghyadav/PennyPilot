import { db } from  "./config";
import  { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";


type createUserDocumentProps = {
    uid: string,
    data: {
        name: string,
        email: string,
        profileURL: string
    }

}

type UserDocument = {
  id: string;
  name: string;
  email: string;
  profileURL: string;
};


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