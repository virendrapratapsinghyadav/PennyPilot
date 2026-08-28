import { TrendingUp } from "lucide-react"
import { LabelList, RadialBar, RadialBarChart } from "recharts"

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

import { useTransactionStore } from "@/store/transactionStore"
import { getExpenseByCategory } from "@/utils/transaction.utils"

export const description = "A radial chart with a label"

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig

export function ChartRadialLabel() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  )

  const expenseByCategory = getExpenseByCategory(transactions)

  const chartData = Object.entries(expenseByCategory).map(
    ([category, amount], index) => ({
      category,
      amount,
      fill: chartColors[index % chartColors.length],
    })
  )

  return (
    <Card
      className="
        brutal-card
        flex flex-col
        overflow-hidden
        rounded-none
        border-2
        py-0
      "
    >
      <CardHeader
        className="
          border-b-2
          border-[var(--border)]
          bg-[var(--card)]
          px-5 py-5
          text-left
        "
      >
        <CardTitle
          className="
            text-lg
            font-black
            uppercase
            tracking-tight
            text-[var(--foreground)]
          "
        >
          Expense Breakdown
        </CardTitle>

        <CardDescription
          className="
            text-sm
            font-medium
            text-[var(--muted-foreground)]
          "
        >
          August 2024
        </CardDescription>
      </CardHeader>

      <CardContent
        className="
          flex flex-1
          items-center
          justify-center
          bg-[var(--card)]
          px-4
          pb-4
          pt-6
        "
      >
        <ChartContainer
          config={chartConfig}
          className="
            mx-auto
            aspect-square
            w-full
            max-h-[280px]
          "
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={28}
            outerRadius={120}
            barCategoryGap={3}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="category"
                  className="
                    rounded-none
                    border-2
                    border-[var(--border)]
                    bg-[var(--card)]
                    text-[var(--foreground)]
                    shadow-[4px_4px_0_var(--shadow-color)]
                  "
                />
              }
            />

            <RadialBar
              dataKey="amount"
              background={{
                fill: "var(--muted)",
              }}
              cornerRadius={0}
              stroke="var(--border)"
              strokeWidth={1}
            >
              <LabelList
                position="insideStart"
                dataKey="category"
                className="
                  fill-[var(--primary-foreground)]
                  capitalize
                  font-bold
                "
                fontSize={10}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter
        className="
          flex-col
          items-start
          gap-3
          border-t-2
          border-[var(--border)]
          bg-[var(--muted)]
          px-5 py-4
          text-sm
          rounded-none
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            font-black
            text-[var(--foreground)]
          "
        >
          <span
            className="
              inline-flex
              items-center
              justify-center
              border-2
              border-border
              bg-primary
              p-1
              shadow-[2px_2px_0_var(--shadow-color)]
            "
          >
            <TrendingUp className="h-4 w-4" />
          </span>

          <span>Trending up by 5.2% this month</span>
        </div>

        <div
          className="
            text-xs
            font-medium
            uppercase
            tracking-wide
            text-[var(--muted-foreground)]
          "
        >
          Showing total expenses for this month
        </div>
      </CardFooter>
    </Card>
  )
}