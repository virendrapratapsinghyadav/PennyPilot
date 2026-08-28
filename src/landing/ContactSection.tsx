import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const CARD_CLIP =
  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";

const BUTTON_CLIP =
  "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)";

const ICON_CLIP =
  "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)";

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Connect to your backend/API
    setSubmitted(true);
  };

  const inputClass = `
    w-full
    rounded-none
    border
    border-border
    bg-background
    px-4
    py-3
    font-sans
    text-sm
    text-foreground
    placeholder:text-muted-foreground/50
    transition-all
    duration-200
    focus:border-primary/60
    focus:bg-primary/[0.02]
    focus:outline-none
    focus:ring-1
    focus:ring-primary/30
  `;

  return (
    <section
      id="contact"
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

      <div className="mx-auto max-w-2xl px-4 sm:px-8">
        {/* ───────────────── Header ───────────────── */}
        <div className="mb-12 text-center">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.35em] text-primary">
            Support
          </p>

          <h2 className="mb-5 text-4xl font-black uppercase tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            Let&apos;s Talk
            <br />
            <span className="text-primary">
              About Your Finances
            </span>
          </h2>

          <p className="mx-auto max-w-lg font-sans text-base leading-relaxed text-muted-foreground">
            Have questions about PennyPilot, AI insights, transaction
            tracking, or your dashboard? Send us a message and we&apos;ll
            help you out.
          </p>
        </div>

        {/* ───────────────── Contact Card ───────────────── */}
        <div
          className="
            group
            relative
            overflow-hidden
            border
            border-border
            bg-card
            p-6
            transition-all
            duration-300
            hover:border-primary/30
            sm:p-8
          "
          style={{
            clipPath: CARD_CLIP,
          }}
        >
          {/* Subtle hover glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-primary
              opacity-0
              blur-3xl
              transition-opacity
              duration-500
              group-hover:opacity-[0.05]
            "
          />

          {/* Hover outline */}
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

          {submitted ? (
            /* ───────────────── Success State ───────────────── */
            <div
              className="relative z-10 flex flex-col items-center gap-4 py-12 text-center"
              aria-live="polite"
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  border
                  border-primary/40
                  bg-primary/10
                  text-primary
                "
                style={{
                  clipPath: ICON_CLIP,
                }}
              >
                <Check
                  className="h-6 w-6"
                  strokeWidth={2.5}
                />
              </div>

              <div>
                <h3 className="mt-2 text-lg font-black uppercase tracking-wide text-foreground">
                  Message Sent
                </h3>

                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                  Thanks for reaching out. We&apos;ll get back to you soon.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    message: "",
                  });
                }}
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-black
                  uppercase
                  tracking-widest
                  text-primary
                  transition-all
                  duration-200
                  hover:gap-3
                  hover:text-primary/80
                "
              >
                Send another message
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            /* ───────────────── Form ───────────────── */
            <form
              onSubmit={handleSubmit}
              className="relative z-10 space-y-6"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-widest
                    text-muted-foreground
                  "
                >
                  Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      name: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-widest
                    text-muted-foreground
                  "
                >
                  Email Address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      email: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-widest
                    text-muted-foreground
                  "
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Ask us anything about PennyPilot..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      message: e.target.value,
                    }))
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  bg-primary
                  py-4
                  text-xs
                  font-black
                  uppercase
                  tracking-widest
                  text-primary-foreground
                  transition-all
                  duration-200
                  hover:opacity-90
                  active:scale-[0.98]
                "
                style={{
                  clipPath: BUTTON_CLIP,
                }}
              >
                Send Message
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Bottom accent */}
          <div
            className="
              absolute
              bottom-0
              left-0
              h-px
              w-16
              bg-primary
              opacity-60
            "
          />
        </div>

        {/* ───────────────── Status Badge ───────────────── */}
        <div className="mt-6 flex justify-center sm:justify-end">
          <div
            className="
              inline-flex
              items-center
              gap-2
              border
              border-border
              bg-card
              px-4
              py-2
              text-[10px]
              font-black
              uppercase
              tracking-widest
              text-muted-foreground
            "
            style={{
              clipPath: ICON_CLIP,
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>

            PennyPilot · Smart Finance
          </div>
        </div>
      </div>
    </section>
  );
}