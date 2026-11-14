import { create } from "zustand";
import type { UserStoreProps } from "@/types/user.types";

export const useUserStore = create<UserStoreProps>((set)=>({
    //States
    user: null,
    loading: true,

    //Actions
    setUser: (user)=> set({user}),
    clearUser: ()=> set({user: null}),
    setLoading: (loading) => set({ loading }),
    updateUser: (updates) => set((state) => ({
        user: state.user
        ? {...state.user, ...updates}
        : null,
    })),
}));





