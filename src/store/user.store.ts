import { create } from "zustand";
import type { UserStoreProps } from "@/types/user.types";

export const useUserStore = create<UserStoreProps>((set)=>({
    //States
    user: null,

    //Actions
    setUser: (user)=> set({user}),
    clearUser: ()=> set({user: null}),
    updateUser: (updates) => set((state) => ({
        user: state.user
        ? {...state.user, ...updates}
        : null,
    })),
}));





