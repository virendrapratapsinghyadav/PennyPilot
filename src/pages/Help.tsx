import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Mail,
  MessageCircleQuestion,
  Search,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const Help = () => {
  const helpTopics = [
    {
      icon: Wallet,
      title: "Managing your money",
      description:
        "Learn how to track expenses, manage your budget, and stay on top of your finances.",
    },
    {
      icon: ShieldCheck,
      title: "Account & security",
      description:
        "Get help with your account, password, profile information, and keeping your data secure.",
    },
    {
      icon: MessageCircleQuestion,
      title: "Using PennyPilot",
      description:
        "Find answers about your dashboard, transactions, categories, and other features.",
    },
  ];

  const faqs = [
    {
      question: "How do I add a transaction?",
      answer:
        "Go to your dashboard and use the transaction section to record your income or expenses.",
    },
    {
      question: "Can I track my monthly spending?",
      answer:
        "Yes. PennyPilot helps you organize your transactions and understand where your money is going.",
    },
    {
      question: "How can I update my profile?",
      answer:
        "Open your profile settings from the dashboard and update the information you want to change.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "Use the password recovery option on the login page to reset your password securely.",
    },
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <section className="mb-8">
          <div className="brutal-card bg-primary p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-1 text-xs font-black uppercase tracking-wider text-card-foreground">
                  <HelpCircle className="h-4 w-4" />
                  PennyPilot Help Center
                </div>

                <h1 className="text-3xl font-black tracking-tight text-primary-foreground md:text-5xl">
                  How can we help?
                </h1>

                <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-primary-foreground/80 md:text-base">
                  Find answers, learn how PennyPilot works, or get help
                  managing your personal finances.
                </p>
              </div>

              <div className="hidden border-2 border-border bg-card p-5 shadow-[4px_4px_0_var(--shadow-color)] md:block">
                <Wallet className="h-12 w-12 text-foreground" />
              </div>
            </div>

            {/* Search */}
            <div className="mt-7 relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search for help..."
                className="brutal-input h-13 rounded-none bg-card pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:shadow-[3px_3px_0_var(--shadow-color)]"
              />
            </div>
          </div>
        </section>

        {/* Help Topics */}
        <section className="mb-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Browse topics
              </p>

              <h2 className="mt-1 text-2xl font-black text-foreground">
                What do you need help with?
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {helpTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <Card
                  key={topic.title}
                  className="brutal-card brutal-hover cursor-pointer rounded-none"
                >
                  <CardHeader>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center border-2 border-border bg-accent">
                      <Icon className="h-5 w-5 text-accent-foreground" />
                    </div>

                    <CardTitle className="text-lg font-black">
                      {topic.title}
                    </CardTitle>

                    <CardDescription className="leading-6">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card className="brutal-card rounded-none">
            <CardHeader className="border-b-2 border-border">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Frequently asked
              </p>

              <CardTitle className="text-2xl font-black">
                Common questions
              </CardTitle>

              <CardDescription>
                Quick answers to questions you may have while using
                PennyPilot.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`p-5 ${
                    index !== faqs.length - 1
                      ? "border-b-2 border-border"
                      : ""
                  }`}
                >
                  <h3 className="font-black text-foreground">
                    {faq.question}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact */}
          <aside className="space-y-5">
            <Card className="brutal-card rounded-none bg-secondary">
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center border-2 border-border bg-card">
                  <Mail className="h-5 w-5 text-foreground" />
                </div>

                <CardTitle className="text-xl font-black">
                  Still need help?
                </CardTitle>

                <CardDescription className="text-secondary-foreground">
                  Can't find what you're looking for? Reach out and we'll
                  help you figure it out.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <button
                  type="button"
                  className="brutal-button w-full rounded-none bg-primary px-4 py-3 text-sm font-black uppercase tracking-wide text-primary-foreground"
                >
                  Contact support
                </button>
              </CardContent>
            </Card>

            <Card className="brutal-card rounded-none">
              <CardContent className="p-5">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  PennyPilot
                </p>

                <h3 className="mt-2 text-lg font-black text-foreground">
                  Your money. Your plan.
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Keep your spending organized and make smarter financial
                  decisions with PennyPilot.
                </p>
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default Help;
