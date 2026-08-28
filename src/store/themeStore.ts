import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark";

type ThemeStoreType = {
    theme: ThemeMode,
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
}


export const useThemeStore = create<ThemeStoreType>()(
    persist(
        (set) => ({
            theme: "light",

            setTheme: (theme) => {
                set({theme});
            },

            toggleTheme: () => {
                set((state) => ({
                    theme: state.theme === "light"? "dark" : "light",
                }));
            },
        }),
        {
            name:"pennypilot-theme"
        }
    )
);