import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode;
}


export function ThemeProvider({children}: Props) {
    const theme = useThemeStore((state)=>state.theme);

    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("light", "dark");
        root.classList.add(theme);

        localStorage.setItem("pennypilot-theme", theme);

    }, [theme]);

    return <>{children}</>;
}