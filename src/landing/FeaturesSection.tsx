import {
  Bot,
  Wallet,
  Activity,
  Receipt,
  BarChart3,
  Lightbulb,
} from "lucide-react";

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  highlight?: boolean;
};

const FEATURES: Feature[] = [
  {
    icon: Bot,
    title: "AI Spending Analysis",
    description:
      "Analyze your spending patterns, transaction history, and financial behavior with AI-powered insights.",
    highlight: true,
  },
  {
    icon: Lightbulb,
    title: "AI Recommendations",
    description:
      "Get personalized suggestions and recommendations based on your transactions and calculated financial data.",
  },
  {
    icon: Activity,
    title: "Real-time Dashboard",
    description:
      "Track your income, expenses, balance, and financial activity through a clear and interactive dashboard.",
  },
  {
    icon: Receipt,
    title: "Transaction Tracking",
    description:
      "Log, categorize, and manage your income and expenses to keep your financial activity organized.",
  },
  {
    icon: BarChart3,
    title: "Charts & Analytics",
    description:
      "Visualize spending categories, income, expenses, and financial trends with interactive charts.",
  },
  {
    icon: Wallet,
    title: "Smart Financial Insights",
    description:
      "Turn your transactions and calculated data into meaningful insights to help you make better financial decisions.",
  },
];

const CLIP_PATH =
  "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-background py-14 md:py-20"
    >
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
        {/* ───────────────── Section Header ───────────────── */}
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.35em] text-primary">
            Smart Finance
          </p>

          <h2 className="mb-5 text-4xl font-black uppercase tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            Everything You Need
            <br />
            <span className="text-primary">
              to Master Your Money
            </span>
          </h2>

          <p className="mx-auto max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
            PennyPilot combines transaction tracking, powerful analytics,
            interactive dashboards, and AI-powered insights to help you
            understand and improve your financial habits.
          </p>
        </div>

        {/* ───────────────── Feature Grid ───────────────── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={`
                  group
                  relative
                  overflow-hidden
                  p-7
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  ${
                    feature.highlight
                      ? "border border-primary/35 bg-primary/[0.06]"
                      : "border border-border bg-card"
                  }
                `}
                style={{
                  clipPath: CLIP_PATH,
                }}
              >
                {/* ───────── Highlight Corner ───────── */}
                {feature.highlight && (
                  <>
                    <div className="absolute left-0 top-0 h-px w-10 bg-primary" />
                    <div className="absolute left-0 top-0 h-10 w-px bg-primary" />
                  </>
                )}

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
                  className={`
                    relative
                    z-10
                    mb-5
                    inline-flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    border
                    transition-all
                    duration-300
                    ${
                      feature.highlight
                        ? "border-primary/50 text-primary"
                        : "border-border text-muted-foreground"
                    }
                    group-hover:border-primary/60
                    group-hover:text-primary
                  `}
                >
                  <Icon
                    className="h-5 w-5"
                    strokeWidth={1.75}
                  />
                </div>

                {/* ───────── Title ───────── */}
                <h3
                  className={`
                    relative
                    z-10
                    mb-2
                    text-[15px]
                    font-black
                    uppercase
                    tracking-wide
                    transition-colors
                    duration-300
                    ${
                      feature.highlight
                        ? "text-primary"
                        : "text-foreground"
                    }
                    group-hover:text-primary
                  `}
                >
                  {feature.title}
                </h3>

                {/* ───────── Description ───────── */}
                <p className="relative z-10 font-sans text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
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
                {feature.highlight && (
                  <div
                    className="
                      absolute
                      bottom-0
                      right-0
                      h-px
                      w-16
                      bg-primary
                      opacity-70
                    "
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}