import { useState } from "react";
import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Lightbulb,
  Loader2,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useTransactionStore } from "@/store/transactionStore";
import { buildMonthlyContext } from "@/ai/contexts/monthlyContext";
import { generateSpendingInsights } from "@/ai/aiService";


const AIInsights = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Read transactions from the existing Zustand store.
  const transactions = useTransactionStore(
    (state) => state.transactions,
  );

  const handleGenerateInsights = async () => {
  if (loading) return;

  if (transactions.length === 0) {
    setError("Add some transactions before generating insights.");
    setResponse("");
    return;
  }

  setLoading(true);
  setError("");
  setResponse("");

  try {
    // The context builder handles the current and previous months.
    const context = buildMonthlyContext(transactions, new Date());

    const result = await generateSpendingInsights(context);

    if (!result.trim()) {
      throw new Error("The AI returned an empty response.");
    }

    setResponse(result.trim());
  } catch (err) {
    console.error("AI insights generation failed:", err);

    const message =
      err instanceof Error ? err.message : "Unknown error";

    setError(
      import.meta.env.DEV
        ? `Unable to generate insights: ${message}`
        : "Unable to generate insights right now. Please try again later.",
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 border-2 border-border bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-[3px_3px_0_var(--shadow-color)]">
              <Sparkles className="h-3.5 w-3.5" />
              Smart Finance
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              AI Insights
            </h1>

            <p className="mt-2 max-w-2xl text-sm font-medium text-muted-foreground sm:text-base">
              Understand your spending, savings, and financial habits
              with AI-powered insights.
            </p>
          </div>

          <Button
            onClick={handleGenerateInsights}
            disabled={loading || transactions.length === 0}
            className="brutal-button h-11 rounded-none bg-primary px-5 font-bold text-primary-foreground hover:bg-accent hover:text-black"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Generate Insights
              </>
            )}
          </Button>
        </section>

        {/* Main AI Card */}
        <Card className="brutal-card overflow-hidden rounded-none">
          <CardHeader className="border-b-2 border-border bg-secondary">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-border bg-primary shadow-[3px_3px_0_var(--shadow-color)]">
                <Brain className="h-6 w-6" />
              </div>

              <div>
                <CardTitle className="text-xl font-black">
                  Your Financial Assistant
                </CardTitle>

                <CardDescription className="mt-1 font-medium">
                  AI-generated analysis based on your transaction
                  history.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 sm:p-7">

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mb-4 border-2 border-destructive bg-muted p-4 text-sm font-medium"
              >
                {error}
              </div>
            )}

            {/* Empty State */}
            {!response && !loading && !error && (
              <div className="flex min-h-55 flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center border-2 border-border bg-muted shadow-[4px_4px_0_var(--shadow-color)]">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>

                <h2 className="text-lg font-black">
                  Ready to find patterns?
                </h2>

                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Generate an AI analysis to discover useful patterns
                  in your financial activity.
                </p>

                {transactions.length === 0 && (
                  <p className="mt-3 text-xs font-semibold text-muted-foreground">
                    Add a transaction to get started.
                  </p>
                )}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div
                className="flex min-h-55 flex-col items-center justify-center text-center"
                aria-live="polite"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center border-2 border-border bg-primary shadow-[4px_4px_0_var(--shadow-color)]">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>

                <h2 className="text-lg font-black">
                  Analyzing your finances...
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Looking for spending and savings patterns.
                </p>
              </div>
            )}

            {/* AI Response */}
            {response && !loading && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  AI analysis complete
                </div>

                <div className="border-2 border-border bg-muted p-5 shadow-[4px_4px_0_var(--shadow-color)]">
                  <p className="whitespace-pre-wrap text-sm font-medium leading-7">
                    {response}
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={handleGenerateInsights}
                  disabled={loading || transactions.length === 0}
                  className="rounded-none border-2 border-border font-bold"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Regenerate Insights
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Insight Categories */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black">
                What your AI can analyze
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Get a clearer picture of where your money goes.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Spending */}
            <Card className="brutal-card brutal-hover rounded-none">
              <CardContent className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-[#f2b84b]">
                    <TrendingDown className="h-5 w-5" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <h3 className="font-black">Spending</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Identify your biggest spending categories and
                  understand how your expenses change each month.
                </p>
              </CardContent>
            </Card>

            {/* Savings */}
            <Card className="brutal-card brutal-hover rounded-none">
              <CardContent className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
                    <Wallet className="h-5 w-5" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <h3 className="font-black">Savings</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Track your saving behavior and discover practical
                  ways to improve your saving rate.
                </p>
              </CardContent>
            </Card>

            {/* Income */}
            <Card className="brutal-card brutal-hover rounded-none">
              <CardContent className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-[#5b8def]">
                    <TrendingUp className="h-5 w-5" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <h3 className="font-black">Income</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Compare income against expenses to understand
                  your monthly financial position.
                </p>
              </CardContent>
            </Card>

            {/* Money Habits */}
            <Card className="brutal-card brutal-hover rounded-none">
              <CardContent className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-[#a875d6]">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <h3 className="font-black">Money Habits</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Discover potential spending patterns and identify
                  realistic opportunities to save.
                </p>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Bottom CTA */}
        <Card className="brutal-card rounded-none bg-primary">
          <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-xl font-black">
                Make your money work smarter.
              </h2>

              <p className="mt-1 max-w-xl text-sm font-medium text-primary-foreground/75">
                Your transaction history can reveal patterns that
                are easy to miss when looking at individual expenses.
              </p>
            </div>

            <Button
              onClick={handleGenerateInsights}
              disabled={loading || transactions.length === 0}
              className="brutal-button shrink-0 rounded-none bg-card px-5 font-black text-foreground hover:bg-muted"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Finances"
              )}
            </Button>
          </CardContent>
        </Card>

      </div>
    </main>
  );
};

export default AIInsights;