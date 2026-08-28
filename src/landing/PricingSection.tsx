import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

type Plan = {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Everything you need to start tracking your finances.",
    features: [
      "Track income & expenses",
      "Basic dashboard",
      "Transaction history",
      "Basic spending charts",
      "Monthly summaries",
    ],
    cta: "Get Started Free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: 9,
    yearlyPrice: 7,
    description: "Powerful AI insights for smarter financial decisions.",
    features: [
      "Everything in Free",
      "AI spending analysis",
      "Personalized recommendations",
      "Advanced charts & analytics",
      "Spending trends & insights",
      "AI financial assistant",
    ],
    cta: "Start Free Trial",
    href: "/signup",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Premium",
    monthlyPrice: 19,
    yearlyPrice: 15,
    description: "Complete financial intelligence for serious tracking.",
    features: [
      "Everything in Pro",
      "Advanced AI insights",
      "Detailed financial analysis",
      "Custom spending goals",
      "Predictive spending insights",
      "Priority support",
    ],
    cta: "Get Premium",
    href: "/signup",
    highlighted: false,
  },
];

const ACCENT = "#ccff00";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="bg-[#050505] py-14 md:py-18">
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
        {/* Header */}
        <div className="mb-16 text-center">
          <p
            className="mb-4 text-[11px] font-black uppercase tracking-[0.35em]"
            style={{ color: ACCENT }}
          >
            Pricing
          </p>

          <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:text-6xl">
            Simple Plans
            <br />
            <span style={{ color: ACCENT }}>Smarter Finances</span>
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-base text-zinc-500 font-sans">
            Choose the right PennyPilot plan to track your money, understand
            your spending, and unlock AI-powered financial insights.
          </p>

          {/* Billing Toggle */}
          <div
            className="inline-flex items-center gap-1 p-1"
            style={{
              border: "1px solid rgba(204,255,0,0.2)",
              background: "rgba(204,255,0,0.03)",
            }}
          >
            <button
              onClick={() => setIsYearly(false)}
              className="px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition-all"
              style={
                !isYearly
                  ? { background: ACCENT, color: "#000" }
                  : { color: "#71717a" }
              }
            >
              Monthly
            </button>

            <button
              onClick={() => setIsYearly(true)}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition-all"
              style={
                isYearly
                  ? { background: ACCENT, color: "#000" }
                  : { color: "#71717a" }
              }
            >
              Yearly

              <span
                className="px-2 py-0.5 text-[10px] font-black"
                style={{
                  border: isYearly
                    ? "1px solid rgba(0,0,0,0.3)"
                    : "1px solid rgba(204,255,0,0.3)",
                  color: isYearly ? "#000" : ACCENT,
                }}
              >
                20% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid items-stretch grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => {
            const price = isYearly
              ? plan.yearlyPrice
              : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className="group relative flex h-full min-h-[570px] flex-col overflow-visible p-8 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: plan.highlighted
                    ? "1px solid rgba(204,255,0,0.45)"
                    : "1px solid rgba(255,255,255,0.08)",
                  clipPath:
                    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                }}
              >
                {/* Hover outline */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    border: `1.5px solid ${ACCENT}`,
                    clipPath:
                      "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  }}
                />

                {/* Pro corner accents */}
                {plan.highlighted && (
                  <>
                    <div
                      className="absolute left-0 top-0 h-px w-12"
                      style={{ background: ACCENT }}
                    />

                    <div
                      className="absolute left-0 top-0 h-12 w-px"
                      style={{ background: ACCENT }}
                    />

                    <div
                      className="absolute bottom-0 right-0 h-px w-12"
                      style={{ background: ACCENT }}
                    />

                    <div
                      className="absolute bottom-0 right-0 h-12 w-px"
                      style={{ background: ACCENT }}
                    />
                  </>
                )}

                {/* Badge - inside card */}
                <div className="relative z-10 mb-5 h-7">
                  {plan.badge && (
                    <span
                      className="inline-block px-4 py-1 text-[10px] font-black uppercase tracking-widest text-black"
                      style={{
                        background: ACCENT,
                      }}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Plan Header */}
                <div className="relative z-10 min-h-[90px]">
                  <h3
                    className="text-lg font-black uppercase tracking-wider"
                    style={{
                      color: plan.highlighted ? ACCENT : "#fff",
                    }}
                  >
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-500 font-sans">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="relative z-10 mb-8 min-h-[90px]">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black tracking-tight text-white">
                      {price === 0 ? "Free" : `$${price}`}
                    </span>

                    {price > 0 && (
                      <span className="mb-1.5 text-sm text-zinc-500 font-sans">
                        / month
                      </span>
                    )}
                  </div>

                  {isYearly && price > 0 && (
                    <p className="mt-1 text-xs text-zinc-600 font-sans">
                      Billed annually — ${price * 12} / year
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="relative z-10 flex-1 space-y-3">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-sm text-zinc-300 font-sans"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center"
                        style={{
                          border: plan.highlighted
                            ? "1px solid rgba(204,255,0,0.4)"
                            : "1px solid rgba(255,255,255,0.1)",
                          color: plan.highlighted
                            ? ACCENT
                            : "#71717a",
                        }}
                      >
                        <Check
                          className="h-3 w-3"
                          strokeWidth={3}
                        />
                      </span>

                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="relative z-10 mt-8">
                  <Link
                    to={plan.href}
                    className="block w-full py-3.5 text-center text-sm font-black uppercase tracking-widest transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={
                      plan.highlighted
                        ? {
                            background: ACCENT,
                            color: "#000",
                            clipPath:
                              "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
                          }
                        : {
                            border:
                              "1px solid rgba(255,255,255,0.15)",
                            color: "#fff",
                          }
                    }
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}