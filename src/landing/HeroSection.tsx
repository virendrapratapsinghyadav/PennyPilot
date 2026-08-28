import { Link } from "react-router-dom";
import { CircleArrowRight, Bot, Globe, User } from "lucide-react";

const ANALYTICS_NODES = [
  { top: "20%", left: "50%", size: 9 },
  { top: "55%", left: "30%", size: 11 },
  { top: "35%", left: "70%", size: 8 },
  { top: "70%", left: "60%", size: 9 },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      {/* ───────────────── Background ───────────────── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Primary glow */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-120
            w-4xl
            -translate-x-1/2
            rounded-full
            blur-[140px]
            opacity-20
            bg-primary
          "
        />

        {/* Secondary glow */}
        <div
          className="
            absolute
            -bottom-20
            left-1/2
            h-40
            w-280
            -translate-x-1/2
            rounded-full
            blur-[100px]
            opacity-10
            bg-primary
          "
        />

        {/* Dotted perspective grid */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[60%] opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--primary) / 0.85) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.7) 55%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.7) 55%, transparent)",
            transform:
              "perspective(600px) rotateX(55deg) scale(2.5)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Subtle horizontal line */}
        <div
          className="
            absolute
            left-0
            right-0
            top-1/2
            h-px
            bg-primary
            opacity-10
          "
        />
      </div>

      {/* ───────────────── Hero Content ───────────────── */}
      <div
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
          items-center
          justify-center
          px-4
          pb-16
          pt-28
          text-center
        "
      >
        {/* Eyebrow */}
        <div
          className="
            mb-6
            border
            border-primary/30
            bg-primary/5
            px-4
            py-2
            text-[10px]
            font-black
            uppercase
            tracking-[0.25em]
            text-primary
          "
        >
          AI-Powered Expense Tracker
        </div>

        <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Your money. Your data. Your control.
        </p>

        {/* Headline */}
        <h1
          className="
            max-w-5xl
            font-black
            uppercase
            leading-[0.88]
            tracking-tighter
            text-foreground
          "
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 5.5rem)" }}
        >
          Track
          <br />
          Smarter With
          <br />

          <span className="text-primary">PennyPilot</span>
        </h1>

        {/* Description */}
        <p
          className="
            mt-8
            max-w-lg
            text-base
            font-sans
            leading-relaxed
            text-muted-foreground
          "
        >
          Log your transactions, understand where your money goes, and make
          smarter financial decisions with AI-powered insights, analytics,
          charts, and personalized recommendations.
        </p>

        {/* ───────────────── CTA ───────────────── */}
        <div className="mt-12 flex items-center">
          <Link
            to="/dashboard"
            className="
              brutal-button
              flex
              items-center
              gap-3
              bg-primary
              px-8
              py-4
              text-sm
              font-black
              uppercase
              tracking-widest
              text-primary-foreground
              transition-all
              hover:brightness-110
            "
            style={{
              clipPath:
                "polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)",
            }}
          >
            Start Tracking
          </Link>

          <Link
            to="/dashboard"
            aria-label="Start tracking"
            className="
              group
              flex
              h-13
              w-14
              items-center
              justify-center
              border
              border-l-0
              border-primary/40
              bg-background/60
              transition-all
              hover:bg-primary
            "
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
            }}
          >
            <CircleArrowRight
              className="
                h-5
                w-5
                text-primary
                transition-colors
                group-hover:text-primary-foreground
              "
            />
          </Link>
        </div>

        {/* Social proof */}
        <p
          className="
            mt-8
            text-xs
            font-bold
            uppercase
            tracking-widest
            text-muted-foreground/50
          "
        >
          Take control of your spending with AI
        </p>
      </div>

      {/* ───────────────── Feature Cards ───────────────── */}
      <div
        id="features"
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          gap-0
          px-4
          sm:px-8
          md:grid-cols-2
        "
      >
        {/* ───────── AI Assistant ───────── */}
        <div
          className="
            group
            relative
            min-h-55
            overflow-hidden
            border
            border-border
            bg-card
            transition-all
            duration-300
            hover:border-primary/60
          "
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--card)) 60%, hsl(var(--primary) / 0.08) 100%)",
            clipPath:
              "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))",
          }}
        >
          {/* Corner accents */}
          <div className="absolute right-0 top-0 h-px w-16 bg-primary" />
          <div className="absolute right-0 top-0 h-16 w-px bg-primary" />

          <div className="flex min-h-55 max-w-[60%] flex-col justify-center p-8 sm:p-10">
            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              AI Assistant
            </div>

            <h2
              className="
                mb-3
                text-2xl
                font-black
                uppercase
                leading-tight
                tracking-tight
                text-foreground
              "
            >
              PennyPilot&mdash;
              <br />
              AI Assistant
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Get intelligent suggestions, spending recommendations, and
              personalized insights based on your transactions and financial
              data.
            </p>
          </div>

          {/* Robot */}
          <div className="absolute bottom-0 right-0 flex h-full w-[42%] items-end justify-center overflow-hidden">
            <div className="relative mb-0">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />

              <Bot
                className="
                  relative
                  h-32
                  w-32
                  text-primary
                  drop-shadow-[0_0_30px_hsl(var(--primary)/0.4)]
                  transition-transform
                  duration-500
                  group-hover:scale-105
                  sm:h-36
                  sm:w-36
                "
                strokeWidth={0.8}
              />
            </div>
          </div>
        </div>

        {/* ───────── Analytics ───────── */}
        <div
          className="
            group
            relative
            min-h-55
            overflow-hidden
            border
            border-t-0
            border-border
            bg-card
            transition-all
            duration-300
            hover:border-primary/60
            md:border-l-0
            md:border-t
          "
          style={{
            background:
              "linear-gradient(225deg, hsl(var(--card)) 60%, hsl(var(--primary) / 0.08) 100%)",
            clipPath:
              "polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)",
          }}
        >
          {/* Corner accents */}
          <div className="absolute bottom-0 left-0 h-px w-16 bg-primary" />
          <div className="absolute bottom-0 left-0 h-16 w-px bg-primary" />

          <div className="ml-auto flex min-h-55 max-w-[60%] flex-col justify-center p-8 sm:p-10">
            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Financial Analytics
            </div>

            <h2
              className="
                mb-3
                text-2xl
                font-black
                uppercase
                leading-tight
                tracking-tight
                text-foreground
              "
            >
              Smart
              <br />
              Analytics
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Visualize your income and expenses with interactive charts,
              dashboards, calculated insights, and detailed spending trends.
            </p>
          </div>

          {/* Analytics visualization */}
          <div className="absolute left-0 top-0 flex h-full w-[42%] items-center justify-center overflow-hidden p-6">
            <div className="relative flex h-full w-full items-center justify-center">
              <Globe
                className="
                  h-full
                  w-full
                  text-primary
                  opacity-10
                  transition-transform
                  duration-700
                  group-hover:rotate-6
                "
                strokeWidth={0.4}
              />

              {ANALYTICS_NODES.map((node, index) => (
                <div
                  key={index}
                  className="
                    absolute
                    flex
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-primary/50
                    bg-background
                    shadow-[0_0_12px_hsl(var(--primary)/0.25)]
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                  style={{
                    top: node.top,
                    left: node.left,
                    width: node.size * 4,
                    height: node.size * 4,
                  }}
                >
                  <User className="h-3 w-3 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}