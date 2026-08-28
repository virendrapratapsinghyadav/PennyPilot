import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "GitHub", href: "https://github.com" },
];

const LOGO_CLIP =
  "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background">
      {/* Top divider */}
      <div
        className="h-px w-full bg-primary/20"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              aria-label="PennyPilot home"
              className="
                group
                flex
                h-9
                w-9
                items-center
                justify-center
                overflow-hidden
                border
                border-border
                bg-card
                transition-colors
                duration-200
                hover:border-primary/50
              "
              style={{
                clipPath: LOGO_CLIP,
              }}
            >
              <img
                src="/Logo.png"
                alt="PennyPilot"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </Link>

            <div className="flex flex-col">
              <Link
                to="/"
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-foreground
                  transition-colors
                  hover:text-primary
                "
              >
                PennyPilot
              </Link>

              <span className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                Smart Finance
              </span>
            </div>

            <span
              className="
                hidden
                h-4
                w-px
                bg-border
                sm:block
              "
            />

            <span className="hidden text-xs text-muted-foreground sm:block">
              &copy; {year} All rights reserved.
            </span>
          </div>

          {/* Footer Navigation */}
          <nav
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-6
              gap-y-3
              md:justify-end
            "
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map((link) => {
              const isExternal = link.href.startsWith("http");

              const className = `
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-muted-foreground
                transition-colors
                duration-200
                hover:text-primary
              `;

              if (isExternal) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={className}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile copyright */}
          <span className="text-center text-[10px] text-muted-foreground sm:hidden">
            &copy; {year} PennyPilot. All rights reserved.
          </span>
        </div>

        {/* Bottom system line */}
        <div className="mt-7 flex items-center justify-center gap-3 border-t border-border/50 pt-5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />

          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground">
            Financial Intelligence System
          </span>

          <span className="h-px w-8 bg-primary/30" />
        </div>
      </div>
    </footer>
  );
}