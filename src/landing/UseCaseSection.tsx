import {
  Receipt,
  Bot,
  BarChart3,
  Lightbulb,
} from "lucide-react";

type UseCase = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const USE_CASES: UseCase[] = [
  {
    icon: Receipt,
    title: "Transaction Tracking",
    description:
      "Log your income and expenses effortlessly and keep every transaction organized in one place.",
  },
  {
    icon: Bot,
    title: "AI Financial Assistant",
    description:
      "Ask AI about your spending and get personalized insights, suggestions, and recommendations from your financial data.",
  },
  {
    icon: BarChart3,
    title: "Spending Analytics",
    description:
      "Understand where your money goes with interactive charts, spending breakdowns, trends, and calculated insights.",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description:
      "Get actionable recommendations based on your entered transactions, spending patterns, and calculated financial data.",
  },
];

const CLIP_PATH =
  "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))";

export default function UseCaseSection() {
  return (
    <section className="bg-background py-14 md:py-20">
      {/* ───────────────── Top Divider ───────────────── */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-8">
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
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.35em] text-primary">
            How PennyPilot Works
          </p>

          <h2 className="mb-5 text-4xl font-black uppercase tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            Built for Smarter
            <br />
            <span className="text-primary">
              Financial Decisions
            </span>
          </h2>

          <p className="max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
            PennyPilot brings transaction tracking, powerful analytics, and
            AI-powered financial intelligence together in one simple dashboard.
          </p>
        </div>

        {/* ───────────────── Use Cases ───────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {USE_CASES.map((useCase, index) => {
            const Icon = useCase.icon;

            return (
              <article
                key={useCase.title}
                className="
                  group
                  relative
                  min-h-[250px]
                  overflow-hidden
                  border
                  border-border
                  bg-card
                  p-7
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/50
                  sm:p-8
                "
                style={{
                  clipPath: CLIP_PATH,
                }}
              >
                {/* ───────── Background Accent ───────── */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-primary
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-[0.07]
                  "
                />

                {/* ───────── Index ───────── */}
                <span
                  className="
                    absolute
                    right-7
                    top-6
                    font-mono
                    text-[10px]
                    font-bold
                    tracking-[0.2em]
                    text-muted-foreground/40
                  "
                >
                  0{index + 1}
                </span>

                {/* ───────── Hover Border ───────── */}
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

                {/* ───────── Icon ───────── */}
                <div
                  className="
                    relative
                    z-10
                    mb-6
                    inline-flex
                    h-11
                    w-11
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

                {/* ───────── Title ───────── */}
                <h3
                  className="
                    relative
                    z-10
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
                  {useCase.title}
                </h3>

                {/* ───────── Description ───────── */}
                <p className="relative z-10 max-w-lg font-sans text-sm leading-relaxed text-muted-foreground">
                  {useCase.description}
                </p>

                {/* ───────── Explore ───────── */}
                <div
                  className="
                    relative
                    z-10
                    mt-6
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    font-black
                    uppercase
                    tracking-widest
                    text-muted-foreground/60
                    transition-all
                    duration-200
                    group-hover:gap-2.5
                    group-hover:text-primary
                  "
                >
                  <span>Explore</span>

                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>

                {/* ───────── Bottom Accent ───────── */}
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}