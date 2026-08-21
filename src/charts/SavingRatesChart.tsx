import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
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

export const description = "A linear line chart showing monthly savings and saving rate"

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
    <Card>
      <CardHeader>
        <CardTitle>Saving Rates</CardTitle>
        <CardDescription>
          January - Present, 2026
        </CardDescription>
      </CardHeader>

      <CardContent>
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
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis
              yAxisId="saving"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              yAxisId="rate"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, "auto"]}
              tickFormatter={(value) => `${value}%`}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "savingRates") {
                      return [`${Number(value).toFixed(1)}%`, "Saving Rate"]
                    }

                    return [`₹${Number(value).toLocaleString()}`, "Saving"]
                  }}
                />
              }
            />

            <Line
              yAxisId="saving"
              dataKey="saving"
              type="linear"
              stroke="var(--color-saving)"
              strokeWidth={2}
              dot={false}
            />

            <Line
              yAxisId="rate"
              dataKey="savingRates"
              type="linear"
              stroke="var(--color-savingRates)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Track your monthly savings and saving rate
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">
          Comparing savings and saving rate throughout 2026
        </div>
      </CardFooter>
    </Card>
  )
}