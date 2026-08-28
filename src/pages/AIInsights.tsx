import { useState } from "react"
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
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const GEMINI_API_KEY = "Gemini_KEYFROM GOOGLE"

const AIInsights = () => {
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const testGemini = async () => {
    setLoading(true)
    setResponse("")

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Reply with exactly: Gemini API is working.",
                  },
                ],
              },
            ],
          }),
        }
      )

      const data = await res.json()

      console.log("Status:", res.status)
      console.log("Full response:", data)

      if (!res.ok) {
        throw new Error(
          data?.error?.message || "Gemini request failed"
        )
      }

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text

      if (!text) {
        throw new Error("Gemini returned no text.")
      }

      setResponse(text)
    } catch (error) {
      console.error("Gemini error:", error)

      setResponse(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      )
    } finally {
      setLoading(false)
    }
  }

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
            onClick={testGemini}
            disabled={loading}
            className="brutal-button h-11 rounded-none bg-primary px-5 font-bold text-primary-foreground hover:bg-accent"
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
        <Card className="brutal-card rounded-none overflow-hidden">
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
            {!response && !loading && (
              <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
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
              </div>
            )}

            {loading && (
              <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
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
                  unusual expenses.
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
                  Track your saving behavior and discover ways to
                  improve your saving rate.
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
                  Understand your income patterns and compare them
                  against your expenses.
                </p>
              </CardContent>
            </Card>

            {/* Habits */}
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
                  Find recurring behaviors that may be helping or
                  hurting your financial goals.
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
                Your transaction history can reveal patterns that are
                easy to miss when looking at individual expenses.
              </p>
            </div>

            <Button
              onClick={testGemini}
              disabled={loading}
              className="brutal-button shrink-0 rounded-none bg-card px-5 font-black text-foreground hover:bg-muted"
            >
              {loading ? "Analyzing..." : "Analyze Finances"}
            </Button>
          </CardContent>
        </Card>

      </div>
    </main>
  )
}

export default AIInsights