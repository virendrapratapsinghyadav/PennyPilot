import { TrendingUp } from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  calculateMonthly,
  calculateMonthlySavings,
  calculateSavingRate,
} from "@/utils/transaction.utils"
import { useTransactionStore } from "@/store/transactionStore"

export const description =
  "A linear line chart showing monthly savings and saving rate"

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const chartConfig = {
  saving: {
    label: "Saving",
    color: "var(--chart-1)",
  },
  savingRates: {
    label: "Saving Rate",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function SavingRatesChart() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  )

  const monthlyIncome = calculateMonthly(transactions, "Income")
  const monthlyExpense = calculateMonthly(transactions, "Expense")

  const monthlySaving = calculateMonthlySavings(
    monthlyIncome,
    monthlyExpense
  )

  const savingRates = calculateSavingRate(
    monthlyIncome,
    monthlySaving
  )

  const chartData = monthNames.map((month, i) => ({
    month,
    saving: monthlySaving[i] ?? 0,
    savingRates: savingRates[i] ?? 0,
  }))

  return (
    <Card className="brutal-card w-full overflow-hidden rounded-none">
      <CardHeader className="border-b-2 border-border bg-primary/15 rounded-none">
        <CardTitle className="text-base font-bold tracking-tight sm:text-lg">
          Saving Rates
        </CardTitle>

        <CardDescription className="text-xs font-medium text-muted-foreground sm:text-sm">
          January - Present, 2026
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-50 w-full md:h-70"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeOpacity={0.25}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 600,
              }}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis
              yAxisId="saving"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 600,
              }}
              tickFormatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            <YAxis
              yAxisId="rate"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, "auto"]}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 600,
              }}
              tickFormatter={(value) => `${value}%`}
            />

            <ChartTooltip
              cursor={{
                stroke: "var(--primary)",
                strokeWidth: 1.5,
                strokeDasharray: "4 4",
              }}
              content={
                <ChartTooltipContent
                  className="brutal-card"
                  indicator="dot"
                  formatter={(value, name) => {
                    if (name === "savingRates") {
                      return [
                        `${Number(value).toFixed(1)}%`,
                        "Saving Rate",
                      ]
                    }

                    return [
                      `₹${Number(value).toLocaleString("en-IN")}`,
                      "Saving",
                    ]
                  }}
                />
              }
            />

            <Line
              yAxisId="saving"
              dataKey="saving"
              type="linear"
              stroke="var(--color-saving)"
              strokeWidth={3}
              dot={{
                r: 3,
                fill: "var(--color-saving)",
                stroke: "var(--foreground)",
                strokeWidth: 1.5,
              }}
              activeDot={{
                r: 5,
                fill: "var(--primary)",
                stroke: "var(--foreground)",
                strokeWidth: 2,
              }}
            />

            <Line
              yAxisId="rate"
              dataKey="savingRates"
              type="linear"
              stroke="var(--color-savingRates)"
              strokeWidth={3}
              dot={{
                r: 3,
                fill: "var(--color-savingRates)",
                stroke: "var(--foreground)",
                strokeWidth: 1.5,
              }}
              activeDot={{
                r: 5,
                fill: "var(--primary)",
                stroke: "var(--foreground)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 border-t-2 border-border bg-muted/50 px-4 py-4 text-xs sm:px-6 sm:text-sm">
        <div className="flex items-center gap-2 font-bold leading-none">
          <span>
            Track your monthly savings and saving rate
          </span>

          <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-border bg-primary shadow-[2px_2px_0_var(--shadow-color)]">
            <TrendingUp className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="font-medium leading-none text-muted-foreground">
          Comparing savings and saving rate throughout 2026
        </div>
      </CardFooter>
    </Card>
  )
}