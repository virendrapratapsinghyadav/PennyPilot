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

const ACCENT = "#ccff00";

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#050505] py-14 md:py-18">
      {/* Top divider */}
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-8">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(204,255,0,0.3), transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p
            className="mb-4 text-[11px] font-black uppercase tracking-[0.35em]"
            style={{ color: ACCENT }}
          >
            Smart Finance
          </p>

          <h2 className="mb-5 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:text-6xl">
            Everything You Need
            <br />
            <span style={{ color: ACCENT }}>
              to Master Your Money
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-zinc-500 font-sans">
            PennyPilot combines transaction tracking, powerful analytics,
            interactive dashboards, and AI-powered insights to help you
            understand and improve your financial habits.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: feature.highlight
                    ? "linear-gradient(135deg, rgba(204,255,0,0.08) 0%, rgba(204,255,0,0.02) 100%)"
                    : "rgba(255,255,255,0.03)",
                  border: feature.highlight
                    ? "1px solid rgba(204,255,0,0.35)"
                    : "1px solid rgba(255,255,255,0.08)",
                  clipPath:
                    "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
                }}
              >
                {/* Highlighted Card Corner */}
                {feature.highlight && (
                  <>
                    <div
                      className="absolute top-0 left-0 w-10 h-px"
                      style={{ background: ACCENT }}
                    />
                    <div
                      className="absolute top-0 left-0 h-10 w-px"
                      style={{ background: ACCENT }}
                    />
                  </>
                )}

                {/* Hover Border */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    border: `1.5px solid ${ACCENT}`,
                    clipPath:
                      "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
                  }}
                />

                {/* Icon */}
                <div
                  className="relative z-10 mb-5 inline-flex h-11 w-11 items-center justify-center transition-colors duration-300 group-hover:border-[#ccff00]/50 group-hover:text-[#ccff00]"
                  style={{
                    border: feature.highlight
                      ? "1px solid rgba(204,255,0,0.5)"
                      : "1px solid rgba(255,255,255,0.1)",
                    color: feature.highlight
                      ? ACCENT
                      : "#71717a",
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    strokeWidth={1.75}
                  />
                </div>

                {/* Title */}
                <h3
                  className="relative z-10 mb-2 text-[15px] font-black uppercase tracking-wide"
                  style={{
                    color: feature.highlight ? ACCENT : "#ffffff",
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-sm leading-relaxed text-zinc-500 font-sans">
                  {feature.description}
                </p>

                {/* Bottom Explore */}
                <div className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-600 transition-all duration-200 group-hover:gap-2.5 group-hover:text-[#ccff00]">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}