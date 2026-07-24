import { create } from "zustand";

interface  UserProfileProps {
    id: string,
    name: string,
    email: string,
    profileURL: string
}

interface  UserStoreProps {
    user: UserProfileProps | null,
    setUser: (user: UserProfileProps | null)=> void,
    clearUser: ()=> void
}

export const useUserStore = create<UserStoreProps>((set)=>({
    //States
    user: null,

    //Actions
    setUser: (user)=> set({user}),
    clearUser: ()=> set({user: null})
}));


