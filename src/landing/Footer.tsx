import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050505]">
      {/* Divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(204,255,0,0.3), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center overflow-hidden"
              style={{
                clipPath:
                  "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
              }}
            >
              <img
                src="/Logo.png"
                alt="PennyPilot Logo"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="text-sm text-zinc-600">
              &copy; {year} PennyPilot. All rights reserved.
            </span>
          </div>

          {/* Footer links */}
          <nav
            className="flex items-center gap-8"
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map((link) => {
              const isExternal = link.href.startsWith("http");

              return isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-600 transition-colors duration-200 hover:text-[#ccff00]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-xs font-medium uppercase tracking-wider text-zinc-600 transition-colors duration-200 hover:text-[#ccff00]"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}