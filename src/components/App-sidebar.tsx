
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
    LayoutDashboard,
    BarChart3,
    Bot,
    CircleHelp,
    LogOut,
} from "lucide-react";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { logoutUser } from "@/firebase/auth";
import { ThemeToggle } from "./ThemeToggle";

// Navigation items
const navigationItems = [
    {
        title: "Dashboard",
        path: ".",
        icon: LayoutDashboard,
    },
    {
        title: "Analytic Charts",
        path: "analytics",
        icon: BarChart3,
    },
    {
        title: "AI Insights",
        path: "aiinsights",
        icon: Bot,
    },
    {
        title: "Help",
        path: "help",
        icon: CircleHelp,
    },
];

export function AppSidebar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Sidebar className="border-r-0">

            {/* HEADER */}
            <SidebarHeader className="border-b border-border p-0">

                <div className="flex items-center justify-between px-4 py-4">

                    <Link
                        to="/dashboard"
                        className="group flex min-w-0 items-center gap-3"
                    >
                        <span className="
                            flex h-9 w-9 shrink-0 items-center justify-center
                            border-2 border-border bg-primary
                            shadow-[3px_3px_0_var(--shadow-color)]
                            transition-transform
                            group-hover:-translate-x-0.5
                            group-hover:-translate-y-0.5
                        ">
                            <img
                                src="/Logo.png"
                                alt="PennyPilot logo"
                                className="h-full w-full object-contain"
                            />
                        </span>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-black uppercase tracking-[0.18em] text-foreground">
                                PennyPilot
                            </p>

                            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                Smart Finance
                            </p>
                        </div>
                    </Link>

                    <ThemeToggle />

                </div>

                {/* SYSTEM STATUS */}
                <div className="flex items-center gap-2 px-4 pb-3">

                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>

                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        System Online
                    </span>

                </div>

            </SidebarHeader>

            {/* NAVIGATION */}
            <SidebarContent className="px-3 py-6">

                <SidebarGroup>

                    <SidebarGroupLabel className="mb-3 px-2 text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                        Navigation
                    </SidebarGroupLabel>

                    <SidebarMenu className="gap-1.5">

                        {navigationItems.map(({ title, path, icon: Icon }) => (
                            <SidebarMenuItem key={path}>

                                <SidebarMenuButton
                                    tooltip={title}
                                    className="h-11 p-0"
                                >
                                    <NavLink
                                        to={path}
                                        end={path === "."}
                                        className={({ isActive }) => `
                                            group flex h-11 w-full items-center gap-3
                                            border px-3 text-sm font-bold
                                            transition-all duration-200
                                            ${
                                                isActive
                                                    ? "border-primary/20 bg-primary/5 text-primary"
                                                    : "border-transparent text-muted-foreground hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                                            }
                                        `}
                                    >
                                        {/* ICON */}
                                        <Icon
                                            size={18}
                                            strokeWidth={1.8}
                                            className="shrink-0"
                                        />

                                        {/* LABEL */}
                                        <span className="flex-1 truncate">
                                            {title}
                                        </span>
                                        
                                    </NavLink>
                                </SidebarMenuButton>

                            </SidebarMenuItem>
                        ))}

                    </SidebarMenu>

                </SidebarGroup>

            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="gap-3 border-t border-border p-4">

                <div
                    className="border border-border bg-background px-3 py-2.5"
                    style={{
                        clipPath:
                            "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
                    }}
                >
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        PennyPilot
                    </p>

                    <p className="mt-1 text-[10px] text-muted-foreground/70">
                        Financial intelligence dashboard
                    </p>
                </div>

                {/* LOGOUT */}
                <Button
                    onClick={handleLogout}
                    className="
                        group h-11 w-full justify-center gap-2
                        rounded-none border border-border
                        bg-card text-xs font-black uppercase tracking-widest
                        text-muted-foreground shadow-none
                        transition-all
                        hover:border-destructive/40
                        hover:bg-destructive/5
                        hover:text-destructive
                    "
                    style={{
                        clipPath:
                            "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                    }}
                >
                    <LogOut
                        size={16}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-hover:-translate-x-0.5"
                    />

                    Logout
                </Button>

            </SidebarFooter>

        </Sidebar>
    );
}
