import {
  Receipt,
  LayoutDashboard,
  Bot,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

type TryItem = {
  icon: React.ElementType;
  number: string;
  title: string;
  description: string;
  to: string;
};

const TRY_ITEMS: TryItem[] = [
  {
    icon: Receipt,
    number: "01",
    title: "Log a Transaction",
    description:
      "Quickly add your income and expenses, categorize them, and keep your financial activity up to date.",
    to: "/dashboard",
  },
  {
    icon: LayoutDashboard,
    number: "02",
    title: "Explore Dashboard",
    description:
      "See your balance, income, expenses, spending breakdowns, and financial trends in one place.",
    to: "/dashboard",
  },
  {
    icon: Bot,
    number: "03",
    title: "Ask PennyPilot AI",
    description:
      "Get personalized insights, suggestions, and recommendations based on your transactions and financial data.",
    to: "/dashboard",
  },
];

const CLIP_PATH =
  "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)";

export default function TryItSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      {/* ───────────────── Top Divider ───────────────── */}
      <div className="mx-auto mb-14 max-w-7xl px-4 sm:px-8">
        <div
          className="h-px w-full bg-primary/20"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* ───────────────── Header ───────────────── */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.35em] text-primary">
            Get Started
          </p>

          <h2 className="mb-5 text-4xl font-black uppercase tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            Take Control of
            <br />
            <span className="text-primary">Your Finances</span>
          </h2>

          <p className="max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
            Start with your transactions, understand your numbers, and let
            PennyPilot help you make smarter financial decisions.
          </p>
        </div>

        {/* ───────────────── 3-Step Flow ───────────────── */}
        <div className="relative">
          {/* Desktop connection line */}
          <div
            className="
              pointer-events-none
              absolute
              left-[16.66%]
              right-[16.66%]
              top-8
              hidden
              h-px
              bg-primary/20
              md:block
            "
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-0">
            {TRY_ITEMS.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`
                    relative
                    ${
                      index !== 0
                        ? "md:border-l md:border-border"
                        : ""
                    }
                  `}
                >
                  {/* Step number */}
                  <div className="relative z-10 mb-6 flex items-center gap-3 md:px-7">
                    <div
                      className="
                        flex
                        h-16
                        w-16
                        shrink-0
                        items-center
                        justify-center
                        border
                        border-primary/40
                        bg-background
                        text-primary
                        shadow-[3px_3px_0_hsl(var(--primary)/0.12)]
                      "
                    >
                      <span className="font-mono text-sm font-black">
                        {item.number}
                      </span>
                    </div>

                    {index < TRY_ITEMS.length - 1 && (
                      <ArrowRight className="hidden h-4 w-4 text-primary/40 md:block" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className="
                      group
                      relative
                      mx-0
                      min-h-[280px]
                      overflow-hidden
                      border
                      border-border
                      bg-card
                      p-7
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-primary/50
                      md:mx-4
                      md:p-8
                    "
                    style={{
                      clipPath: CLIP_PATH,
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-20
                        -top-20
                        h-48
                        w-48
                        rounded-full
                        bg-primary
                        opacity-0
                        blur-3xl
                        transition-opacity
                        duration-500
                        group-hover:opacity-[0.08]
                      "
                    />

                    {/* Hover border */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        border
                        border-primary
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                      style={{
                        clipPath: CLIP_PATH,
                      }}
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className="
                          mb-7
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          border
                          border-border
                          text-muted-foreground
                          transition-all
                          duration-300
                          group-hover:border-primary/60
                          group-hover:bg-primary/5
                          group-hover:text-primary
                        "
                      >
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.75}
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className="
                          mb-3
                          text-lg
                          font-black
                          uppercase
                          tracking-wide
                          text-foreground
                          transition-colors
                          duration-300
                          group-hover:text-primary
                        "
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-8 font-sans text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>

                      {/* CTA */}
                      <Link
                        to={item.to}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-xs
                          font-black
                          uppercase
                          tracking-widest
                          text-muted-foreground/60
                          transition-all
                          duration-200
                          group-hover:gap-3
                          group-hover:text-primary
                        "
                      >
                        Get Started

                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Bottom accent */}
                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-px
                        w-0
                        bg-primary
                        transition-all
                        duration-300
                        group-hover:w-20
                      "
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}