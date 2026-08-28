import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b-2 border-border bg-background">
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-stretch">
        {/* ───────────────── Logo ───────────────── */}
        <div className="flex shrink-0 items-center bg-background px-5 sm:px-8">
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-2"
            aria-label="PennyPilot Tracker home"
          >
            {/* Logo mark */}
            <span
              className="
                relative
                flex
                h-9
                w-9
                items-center
                justify-center
                border-2
                border-border
                bg-primary
                text-primary-foreground
                shadow-[3px_3px_0_var(--shadow-color)]
                transition-transform
                group-hover:-translate-x-0.5
                group-hover:-translate-y-0.5
              "
            >
              <span className="text-lg font-black">$</span>

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-2
                  w-2
                  border
                  border-border
                  bg-background
                "
              />
            </span>

            {/* Wordmark */}
            <span className="hidden sm:flex items-baseline gap-1">
              <span className="text-[17px] font-black uppercase tracking-[0.18em] text-foreground">
                PennyPilot
              </span>

              <span className="text-[17px] font-black uppercase tracking-[0.12em] text-primary">
                Tracker
              </span>
            </span>
          </Link>
        </div>

        {/* ───────────────── Desktop Navigation ───────────────── */}
        <div className="hidden flex-1 items-stretch justify-center md:flex">
          <div
            className="
              relative
              flex
              h-full
              items-center
              gap-8
              border-x-2
              border-border
              bg-primary
              px-10
              shadow-[5px_5px_0_var(--shadow-color)]
              lg:gap-12
              lg:px-16
            "
            style={{
              clipPath:
                "polygon(24px 0, calc(100% - 24px) 0, 100% 100%, 0 100%)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  group
                  relative
                  whitespace-nowrap
                  text-[12px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-primary-foreground
                  transition-transform
                  hover:-translate-y-0.5
                "
              >
                {link.label}

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-[2px]
                    w-0
                    bg-primary-foreground
                    transition-all
                    duration-200
                    group-hover:w-full
                  "
                />
              </a>
            ))}
          </div>
        </div>

        {/* ───────────────── Desktop Actions ───────────────── */}
        <div className="hidden shrink-0 items-center gap-4 bg-background px-5 sm:px-8 md:flex">
          <ThemeToggle />

          <Link
            to="/login"
            className="
              whitespace-nowrap
              text-[12px]
              font-black
              uppercase
              tracking-[0.14em]
              text-muted-foreground
              transition-colors
              hover:text-primary
            "
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="
              brutal-button
              group
              flex
              items-center
              gap-2
              bg-primary
              px-4
              py-2.5
              text-[12px]
              font-black
              uppercase
              tracking-[0.12em]
              text-primary-foreground
            "
          >
            Get Started

            <ArrowUpRight
              className="
                h-4
                w-4
                transition-transform
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>
        </div>

        {/* ───────────────── Mobile Controls ───────────────── */}
        <div className="ml-auto flex items-center gap-2 bg-background px-4 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="
              brutal-button
              border-2
              border-border
              bg-background
              p-2
              text-foreground
              transition-colors
              hover:bg-muted
            "
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ───────────────── Mobile Menu ───────────────── */}
      <div
        id="mobile-navigation"
        className={`
          overflow-hidden
          border-t-2
          border-border
          bg-background
          transition-all
          duration-200
          md:hidden
          ${
            isOpen
              ? "max-h-[500px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }
        `}
      >
        <div className="space-y-2 p-4">
          {/* Mobile nav links */}
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="
                flex
                items-center
                justify-between
                border-2
                border-border
                bg-card
                px-4
                py-3
                text-sm
                font-black
                uppercase
                tracking-widest
                text-foreground
                transition-all
                hover:translate-x-1
                hover:bg-primary
                hover:text-primary-foreground
                hover:shadow-[3px_3px_0_var(--shadow-color)]
              "
            >
              <span>{link.label}</span>

              <span className="text-xs text-muted-foreground">
                0{index + 1}
              </span>
            </a>
          ))}

          {/* Mobile actions */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <Link
              to="/login"
              onClick={closeMenu}
              className="
                brutal-button
                flex
                items-center
                justify-center
                bg-card
                py-3
                text-sm
                font-black
                uppercase
                tracking-wide
                text-foreground
              "
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
              className="
                brutal-button
                flex
                items-center
                justify-center
                bg-primary
                py-3
                text-sm
                font-black
                uppercase
                tracking-wide
                text-primary-foreground
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}