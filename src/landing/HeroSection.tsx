import { Link } from "react-router-dom";
import { CircleArrowRight, Bot, Globe, User } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#050505]">

      {/* ── Dotted Wave Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Green glow blooms */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-225 h-120 rounded-full blur-[140px] opacity-30"
          style={{
            background:
              "radial-gradient(ellipse, #ccff00 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-15 left-1/2 -translate-x-1/2 w-300 h-75 blur-[80px] opacity-15"
          style={{ background: "#ccff00" }}
        />

        {/* Dotted grid perspective */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[60%]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(204,255,0,0.95) 2px, transparent 2px)",
            backgroundSize: "16px 16px",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, transparent 100%)",
            transform:
              "perspective(600px) rotateX(55deg) scale(2.5)",
            transformOrigin: "bottom center",
          }}
        />
      </div>

      {/* ── Headline ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center pt-28 pb-16 px-4">
        <p
          className="mb-6 text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: "#ccff00" }}
        >
          AI-Powered Expense Tracker
        </p>

        <h1
          className="font-black uppercase leading-[0.88] tracking-tighter text-white"
          style={{ fontSize: "clamp(2.5rem, 7.5vw, 5.5rem)" }}
        >
          Track<br />
          Smarter With<br />
          <span style={{ color: "#ccff00", display: "block" }}>
            PennyPilot
          </span>
        </h1>

        <p className="mt-8 max-w-lg text-base text-zinc-400 leading-relaxed font-sans">
          Log your transactions, understand where your money goes, and make
          smarter financial decisions with AI-powered insights, analytics,
          charts, and personalized recommendations.
        </p>

        {/* ── CTA Button ── */}
        <div className="mt-12 flex items-center gap-0">
          <Link
            to="/dashboard"
            className="flex items-center font-bold text-sm uppercase tracking-widest text-black px-10 py-4 hover:opacity-90 transition-opacity"
            style={{
              background: "#ccff00",
              clipPath:
                "polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)",
            }}
          >
            Start Tracking
          </Link>

          <div
            className="flex items-center justify-center w-14 h-13 border border-l-0 transition-all hover:bg-[#ccff00] hover:text-black group"
            style={{
              borderColor: "rgba(204,255,0,0.4)",
              clipPath:
                "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
            }}
          >
            <CircleArrowRight className="w-5 h-5 text-[#ccff00] group-hover:text-black transition-colors" />
          </div>
        </div>

        {/* ── Social proof ── */}
        <p className="mt-8 text-xs text-zinc-600 uppercase tracking-widest">
          Take control of your spending with AI
        </p>
      </div>

      {/* ── Feature Cards ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-0 grid grid-cols-1 md:grid-cols-2 gap-0">

        {/* Card 1 — AI Financial Assistant */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 60%, #0f1a00 100%)",
            border: "1px solid rgba(204,255,0,0.3)",
            clipPath:
              "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))",
          }}
        >
          {/* neon corner accent */}
          <div
            className="absolute top-0 right-0 w-16 h-px"
            style={{ background: "#ccff00" }}
          />
          <div
            className="absolute top-0 right-0 h-16 w-px"
            style={{ background: "#ccff00" }}
          />

          <div className="p-10 pr-[45%] min-h-55 flex flex-col justify-center">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight mb-3">
              PennyPilot&mdash;<br />
              AI Assistant
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Get intelligent suggestions, spending recommendations, and
              personalized insights based on your transactions and financial
              data.
            </p>
          </div>

          {/* Robot illustration area */}
          <div className="absolute right-0 bottom-0 w-[42%] h-full flex items-end justify-center overflow-hidden">
            <div className="relative mb-0">
              <div
                className="absolute inset-0 blur-2xl rounded-full"
                style={{ background: "rgba(204,255,0,0.15)" }}
              />

              <Bot
                className="relative w-36 h-36 drop-shadow-[0_0_30px_rgba(204,255,0,0.5)]"
                style={{ color: "#ccff00" }}
                stroke={"0.8"}
              />
            </div>
          </div>
        </div>

        {/* Card 2 — Financial Analytics */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(225deg, #0a0a0a 60%, #0f1a00 100%)",
            border: "1px solid rgba(204,255,0,0.3)",
            borderLeft: "none",
            clipPath:
              "polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)",
          }}
        >
          {/* neon corner accent */}
          <div
            className="absolute bottom-0 left-0 w-16 h-px"
            style={{ background: "#ccff00" }}
          />
          <div
            className="absolute bottom-0 left-0 h-16 w-px"
            style={{ background: "#ccff00" }}
          />

          <div className="p-10 pl-[44%] min-h-55 flex flex-col justify-center">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight mb-3">
              Smart<br />
              Analytics
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Visualize your income and expenses with interactive charts,
              dashboards, calculated insights, and detailed spending trends.
            </p>
          </div>

          {/* Globe / analytics visualization area */}
          <div className="absolute left-0 top-0 w-[42%] h-full flex items-center justify-center p-6 overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">

              {/* Decorative globe */}
              <Globe
                className="w-full h-full opacity-10"
                style={{ color: "#ccff00" }}
                stroke={"0.4"}
              />

              {/* Floating analytics nodes */}
              {[
                { top: "20%", left: "50%", size: 9 },
                { top: "55%", left: "30%", size: 11 },
                { top: "35%", left: "70%", size: 8 },
                { top: "70%", left: "60%", size: 9 },
              ].map((node, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border flex items-center justify-center"
                  style={{
                    top: node.top,
                    left: node.left,
                    width: node.size * 4,
                    height: node.size * 4,
                    borderColor: "rgba(204,255,0,0.5)",
                    background: "#050505",
                    boxShadow: "0 0 12px rgba(204,255,0,0.3)",
                  }}
                >
                  <User
                    className="w-3 h-3"
                    style={{ color: "#ccff00" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}