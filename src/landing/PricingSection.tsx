import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
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
    description:
      "Everything you need to start tracking your finances.",
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
    description:
      "Powerful AI insights for smarter financial decisions.",
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
    description:
      "Complete financial intelligence for serious tracking.",
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

const CARD_CLIP =
  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";

const BUTTON_CLIP =
  "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="bg-background py-16 md:py-24"
    >
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
        <div className="mb-14 text-center md:mb-16">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.35em] text-primary">
            Pricing
          </p>

          <h2 className="mb-5 text-4xl font-black uppercase tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            Simple Plans
            <br />
            <span className="text-primary">
              Smarter Finances
            </span>
          </h2>

          <p className="mx-auto mb-9 max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
            Choose the right PennyPilot plan to track your money,
            understand your spending, and unlock AI-powered financial
            insights.
          </p>

          {/* ───────────────── Billing Toggle ───────────────── */}
          <div
            className="
              inline-flex
              items-center
              gap-1
              border
              border-primary/20
              bg-primary/[0.03]
              p-1
            "
          >
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={`
                px-6
                py-2.5
                text-xs
                font-black
                uppercase
                tracking-widest
                transition-all
                duration-200
                ${
                  !isYearly
                    ? "bg-primary text-primary-foreground shadow-[2px_2px_0_hsl(var(--foreground)/0.15)]"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={`
                flex
                items-center
                gap-2
                px-6
                py-2.5
                text-xs
                font-black
                uppercase
                tracking-widest
                transition-all
                duration-200
                ${
                  isYearly
                    ? "bg-primary text-primary-foreground shadow-[2px_2px_0_hsl(var(--foreground)/0.15)]"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              Yearly

              <span
                className={`
                  border
                  px-2
                  py-0.5
                  text-[9px]
                  font-black
                  ${
                    isYearly
                      ? "border-primary-foreground/30 text-primary-foreground"
                      : "border-primary/30 text-primary"
                  }
                `}
              >
                20% OFF
              </span>
            </button>
          </div>
        </div>

        {/* ───────────────── Plans ───────────────── */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {PLANS.map((plan, index) => {
            const price = isYearly
              ? plan.yearlyPrice
              : plan.monthlyPrice;

            return (
              <article
                key={plan.name}
                className={`
                  group
                  relative
                  flex
                  min-h-[570px]
                  flex-col
                  overflow-hidden
                  p-7
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  md:p-8
                  ${
                    plan.highlighted
                      ? "border border-primary/50 bg-primary/[0.045]"
                      : "border border-border bg-card"
                  }
                `}
                style={{
                  clipPath: CARD_CLIP,
                }}
              >
                {/* ───────── Pro Glow ───────── */}
                {plan.highlighted && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-56
                      w-56
                      rounded-full
                      bg-primary
                      opacity-[0.07]
                      blur-3xl
                    "
                  />
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
                    clipPath: CARD_CLIP,
                  }}
                />

                {/* ───────── Pro Corner Accents ───────── */}
                {plan.highlighted && (
                  <>
                    <div className="absolute left-0 top-0 h-px w-14 bg-primary" />
                    <div className="absolute left-0 top-0 h-14 w-px bg-primary" />

                    <div className="absolute bottom-0 right-0 h-px w-14 bg-primary" />
                    <div className="absolute bottom-0 right-0 h-14 w-px bg-primary" />
                  </>
                )}

                <div className="relative z-10">
                  {/* ───────── Plan Number ───────── */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-muted-foreground/40">
                      0{index + 1}
                    </span>

                    {plan.badge && (
                      <span className="bg-primary px-3 py-1 text-[9px] font-black uppercase tracking-widest text-primary-foreground">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* ───────── Plan Header ───────── */}
                  <div className="min-h-[105px]">
                    <h3
                      className={`
                        text-lg
                        font-black
                        uppercase
                        tracking-wider
                        ${
                          plan.highlighted
                            ? "text-primary"
                            : "text-foreground"
                        }
                      `}
                    >
                      {plan.name}
                    </h3>

                    <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  {/* ───────── Price ───────── */}
                  <div className="mb-8 min-h-[95px]">
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-black tracking-tight text-foreground">
                        {price === 0 ? "Free" : `$${price}`}
                      </span>

                      {price > 0 && (
                        <span className="mb-1.5 font-sans text-sm text-muted-foreground">
                          / month
                        </span>
                      )}
                    </div>

                    {isYearly && price > 0 && (
                      <p className="mt-1 font-sans text-xs text-muted-foreground/60">
                        Billed annually — ${price * 12} / year
                      </p>
                    )}
                  </div>
                </div>

                {/* ───────── Features ───────── */}
                <ul className="relative z-10 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="
                        flex
                        items-start
                        gap-3
                        font-sans
                        text-sm
                        text-foreground/80
                      "
                    >
                      <span
                        className={`
                          mt-0.5
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          border
                          ${
                            plan.highlighted
                              ? "border-primary/50 text-primary"
                              : "border-border text-muted-foreground"
                          }
                        `}
                      >
                        <Check
                          className="h-3 w-3"
                          strokeWidth={3}
                        />
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* ───────── CTA ───────── */}
                <div className="relative z-10 mt-8">
                  <Link
                    to={plan.href}
                    className={`
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      py-3.5
                      text-center
                      text-xs
                      font-black
                      uppercase
                      tracking-widest
                      transition-all
                      duration-200
                      active:scale-[0.98]
                      ${
                        plan.highlighted
                          ? "bg-primary text-primary-foreground hover:opacity-90"
                          : "border border-border text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                      }
                    `}
                    style={
                      plan.highlighted
                        ? { clipPath: BUTTON_CLIP }
                        : undefined
                    }
                  >
                    {plan.cta}

                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* ───────── Bottom Accent ───────── */}
                {plan.highlighted && (
                  <div className="absolute bottom-0 left-0 h-px w-20 bg-primary" />
                )}
              </article>
            );
          })}
        </div>

        {/* ───────── Pricing Note ───────── */}
        <p className="mt-8 text-center font-sans text-xs text-muted-foreground/50">
          No hidden fees. Cancel anytime. Your financial data stays yours.
        </p>
      </div>
    </section>
  );
}