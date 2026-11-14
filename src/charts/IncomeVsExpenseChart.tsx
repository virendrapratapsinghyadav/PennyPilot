import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

import { useTransactionStore } from "@/store/transaction.store"
import {
  calculateMonthly
} from "@/utils/transaction.utils"

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
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
  expense: {
    label: "Expense",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function IncomeVsExpenseChart() {
  const currentYear = new Date().getFullYear()

  const transactions = useTransactionStore(
    (state) => state.transactions
  )

  const incomeEachMonth = calculateMonthly(
    transactions,
    "Income"
  )

  const expenseEachMonth = calculateMonthly(
    transactions,
    "Expense"
  )


  const chartData = Array.from(
    { length: 12 },
    (_, month) => ({
      month: monthNames[month],
      income: incomeEachMonth[month] ?? 0,
      expense: expenseEachMonth[month] ?? 0,
    })
  )

  return (
    <Card
      className="
        brutal-card
        w-full
        overflow-hidden
        rounded-none
        border-2
        py-0
      "
    >
      <CardHeader
        className="
          border-b-2
          border-border
          bg-card
          px-5
          py-5
        "
      >
        <CardTitle
          className="
            text-lg
            font-black
            uppercase
            tracking-tight
            text-foreground
          "
        >
          Income vs Expense
        </CardTitle>

        <CardDescription
          className="
            text-xs
            font-medium
            text-muted-foreground
            sm:text-sm
          "
        >
          January - Present, {currentYear}
        </CardDescription>
      </CardHeader>

      <CardContent
        className="
          bg-card
          px-3
          py-5
          sm:px-5
          sm:py-6
        "
      >
        <ChartContainer
          config={chartConfig}
          className="
            h-55
            w-full
            sm:h-70
            md:h-80
            lg:h-87.5
          "
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap="18%"
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeOpacity={0.18}
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{
                stroke: "var(--border)",
                strokeWidth: 2,
              }}
              tickMargin={10}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 700,
              }}
            />

            <ChartTooltip
              cursor={{
                fill: "var(--primary)",
                fillOpacity: 0.08,
              }}
              content={
                <ChartTooltipContent
                  className="
                    w-42.5
                    rounded-none
                    border-2
                    border--border
                    bg-card
                    text-foreground
                    shadow-[4px_4px_0_var(--shadow-color)]
                  "
                  indicator="dashed"
                />
              }
            />

            <Bar
              dataKey="income"
              fill="var(--color-income)"
              radius={0}
              stroke="var(--border)"
              strokeWidth={1}
            />

            <Bar
              dataKey="expense"
              fill="var(--color-expense)"
              radius={0}
              stroke="var(--border)"
              strokeWidth={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter
        className="
          flex-col
          items-start
          gap-3
          border-t-2
          rounded-none
          border-border
          bg-muted
          px-5
          py-4
          text-xs
          sm:text-sm
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            font-black
            leading-none
            text-foreground
          "
        >
        </div>

        <div
          className="
            leading-none
            font-medium
            uppercase
            tracking-wide
            text-muted-foreground
          "
        >
          Showing income and expenses for {currentYear}
        </div>
      </CardFooter>
    </Card>
  )
}