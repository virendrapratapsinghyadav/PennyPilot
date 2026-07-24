import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./auth";
import { getUserDocument } from "./firestore";
import { useUserStore } from "@/store/store";


export const listenToAuthChanges =()=>{

    const unsubscribe = onAuthStateChanged(firebaseAuth, async(user)=>{
        if(user){
            const userData = await getUserDocument(user.uid);
            if(userData){
                useUserStore.getState().setUser(userData);
            }
        } else {
            useUserStore.getState().clearUser();
        }
    })
    return unsubscribe;
}