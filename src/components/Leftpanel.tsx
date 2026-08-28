import {
  Sun,
  LayoutDashboard,
  BarChart3,
  Bot,
  CircleHelp,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { logoutUser } from "@/firebase/auth";

const Leftpanel = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <aside className="flex h-full w-full flex-col bg-background">
      {/* ───────────────── Main Panel ───────────────── */}
      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
          overflow-hidden
          border
          border-border
          bg-card
          shadow-[3px_3px_0_var(--shadow-color)]
        "
        style={{
          clipPath:
            "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
        }}
      >
        {/* ───────────────── Brand ───────────────── */}
        <div className="border-b border-border">
          <div className="flex items-center justify-between px-4 py-4">
            <Link
              to="."
              className="
                group
                flex
                min-w-0
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  border
                  border-border
                  bg-background
                  transition-colors
                  duration-200
                  group-hover:border-primary/50
                "
                style={{
                  clipPath:
                    "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
                }}
              >
                <img
                  src="/Logo.png"
                  alt="PennyPilot"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-black uppercase tracking-[0.18em] text-foreground">
                  PennyPilot
                </p>

                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  Smart Finance
                </p>
              </div>
            </Link>

            {/* Theme control — behavior unchanged */}
            <button
              type="button"
              aria-label="Toggle theme"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                border
                border-border
                bg-background
                text-muted-foreground
                transition-all
                duration-200
                hover:border-primary/40
                hover:text-primary
              "
              style={{
                clipPath:
                  "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
              }}
            >
              <Sun size={17} strokeWidth={1.8} />
            </button>
          </div>

          {/* System status */}
          <div className="flex items-center gap-2 px-4 pb-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
            </span>

            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              System Online
            </span>
          </div>
        </div>

        {/* ───────────────── Navigation ───────────────── */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <div className="mb-3 px-2">
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground">
              Navigation
            </span>
          </div>

          <nav className="flex flex-col gap-1.5">
            {/* Dashboard */}
            <Link
              to="."
              className="
                group
                relative
                flex
                items-center
                gap-3
                border
                border-transparent
                px-3
                py-3
                text-sm
                font-bold
                text-muted-foreground
                transition-all
                duration-200
                hover:border-primary/20
                hover:bg-primary/5
                hover:text-primary
              "
            >
              <LayoutDashboard
                size={18}
                strokeWidth={1.8}
                className="shrink-0 transition-colors group-hover:text-primary"
              />

              <span>Dashboard</span>

              <span className="ml-auto h-1.5 w-1.5 bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            {/* Analytics */}
            <Link
              to="analytics"
              className="
                group
                relative
                flex
                items-center
                gap-3
                border
                border-transparent
                px-3
                py-3
                text-sm
                font-bold
                text-muted-foreground
                transition-all
                duration-200
                hover:border-primary/20
                hover:bg-primary/5
                hover:text-primary
              "
            >
              <BarChart3
                size={18}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span>Analytic Charts</span>

              <span className="ml-auto h-1.5 w-1.5 bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            {/* AI Insights */}
            <Link
              to="aiinsights"
              className="
                group
                relative
                flex
                items-center
                gap-3
                border
                border-transparent
                px-3
                py-3
                text-sm
                font-bold
                text-muted-foreground
                transition-all
                duration-200
                hover:border-primary/20
                hover:bg-primary/5
                hover:text-primary
              "
            >
              <Bot
                size={18}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span>AI Insights</span>

              <span className="ml-auto h-1.5 w-1.5 bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            {/* Help */}
            <Link
              to="help"
              className="
                group
                relative
                flex
                items-center
                gap-3
                border
                border-transparent
                px-3
                py-3
                text-sm
                font-bold
                text-muted-foreground
                transition-all
                duration-200
                hover:border-primary/20
                hover:bg-primary/5
                hover:text-primary
              "
            >
              <CircleHelp
                size={18}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span>Help</span>

              <span className="ml-auto h-1.5 w-1.5 bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </nav>
        </div>

        {/* ───────────────── Bottom Info ───────────────── */}
        <div className="border-t border-border px-4 py-4">
          <div
            className="
              border
              border-border
              bg-background
              px-3
              py-2.5
            "
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
        </div>
      </div>

      {/* ───────────────── Logout ───────────────── */}
      <div className="pt-3">
        <Button
          onClick={handleLogout}
          className="
            group
            h-11
            w-full
            justify-center
            gap-2
            rounded-none
            border
            border-border
            bg-card
            text-xs
            font-black
            uppercase
            tracking-widest
            text-muted-foreground
            shadow-none
            transition-all
            duration-200
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
      </div>
    </aside>
  );
};

export default Leftpanel;