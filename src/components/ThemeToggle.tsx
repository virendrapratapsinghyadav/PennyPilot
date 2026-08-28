import { useThemeStore } from "@/store/themeStore";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";



export function ThemeToggle() {
    const theme = useThemeStore((state)=>state.theme);
    const toggleTheme = useThemeStore((state)=>state.toggleTheme);

    return(
        <Button
        variant="destructive"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="brutal-button"
        >
            {
                theme === "dark"? (
                    <Sun className="h-4 w-4" />
                ) : (
                    <Moon className="h-4 w-4" />
                )
            }
        </Button>
    )
}