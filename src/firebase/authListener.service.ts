import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./auth.service";
import { getUserDocument } from "./user.service";
import { useUserStore } from "@/store/user.store";


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