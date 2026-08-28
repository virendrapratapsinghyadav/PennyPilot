import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { useTransactionStore } from "@/store/transactionStore"
import { calculateByPeriod } from "@/utils/transaction.utils"
import { useState } from "react"

import {
  AreaChart,
  CartesianGrid,
  XAxis,
  Area,
} from "recharts"

const chartData = [
  { date: "2026-01-01", income: 15000, expense: 250, saving: 14750 },
  { date: "2026-01-02", income: 0, expense: 267.45, saving: -267.45 },

  { date: "2026-02-01", income: 15000, expense: 250, saving: 14750 },
  { date: "2026-02-02", income: 0, expense: 267.45, saving: -267.45 },

  { date: "2026-04-01", income: 15000, expense: 250, saving: 14750 },
  { date: "2026-04-02", income: 0, expense: 267.45, saving: -267.45 },

  { date: "2026-05-01", income: 15000, expense: 250, saving: 14750 },
  { date: "2026-05-02", income: 0, expense: 267.45, saving: -267.45 },

  { date: "2026-06-01", income: 15000, expense: 250, saving: 14750 },
  { date: "2026-06-02", income: 0, expense: 267.45, saving: -267.45 },

  // July 2026
  { date: "2026-07-01", income: 0, expense: 85, saving: -85 },
  { date: "2026-07-02", income: 2000, expense: 120, saving: 1880 },
  { date: "2026-07-03", income: 0, expense: 60, saving: -60 },
  { date: "2026-07-04", income: 0, expense: 145, saving: -145 },
  { date: "2026-07-05", income: 0, expense: 40, saving: -40 },
  { date: "2026-07-06", income: 0, expense: 210, saving: -210 },
  { date: "2026-07-07", income: 0, expense: 75, saving: -75 },
  { date: "2026-07-08", income: 0, expense: 148, saving: -148 },
  { date: "2026-07-09", income: 0, expense: 95, saving: -95 },
  { date: "2026-07-10", income: 0, expense: 180, saving: -180 },
  { date: "2026-07-11", income: 0, expense: 65, saving: -65 },
  { date: "2026-07-12", income: 0, expense: 120, saving: -120 },
  { date: "2026-07-13", income: 0, expense: 55, saving: -55 },
  { date: "2026-07-14", income: 0, expense: 90, saving: -90 },
  { date: "2026-07-15", income: 0, expense: 250, saving: -250 },
  { date: "2026-07-16", income: 0, expense: 70, saving: -70 },
  { date: "2026-07-17", income: 0, expense: 135, saving: -135 },
  { date: "2026-07-18", income: 0, expense: 190, saving: -190 },
  { date: "2026-07-19", income: 0, expense: 80, saving: -80 },
  { date: "2026-07-20", income: 0, expense: 110, saving: -110 },
  { date: "2026-07-21", income: 0, expense: 45, saving: -45 },
  { date: "2026-07-22", income: 0, expense: 160, saving: -160 },
  { date: "2026-07-23", income: 0, expense: 75, saving: -75 },
  { date: "2026-07-24", income: 0, expense: 125, saving: -125 },
  { date: "2026-07-25", income: 0, expense: 220, saving: -220 },
  { date: "2026-07-26", income: 0, expense: 95, saving: -95 },
  { date: "2026-07-27", income: 0, expense: 65, saving: -65 },
  { date: "2026-07-28", income: 0, expense: 145, saving: -145 },
  { date: "2026-07-29", income: 0, expense: 80, saving: -80 },
  { date: "2026-07-30", income: 0, expense: 175, saving: -175 },
  { date: "2026-07-31", income: 0, expense: 90, saving: -90 },

  // August 2026
  { date: "2026-08-01", income: 15000, expense: 250, saving: 14750 },
  { date: "2026-08-02", income: 0, expense: 267.45, saving: -267.45 },
  { date: "2026-08-03", income: 0, expense: 200, saving: -200 },
  { date: "2026-08-04", income: 0, expense: 95, saving: -95 },
  { date: "2026-08-05", income: 0, expense: 30, saving: -30 },
  { date: "2026-08-06", income: 0, expense: 110, saving: -110 },
  { date: "2026-08-07", income: 0, expense: 50, saving: -50 },
  { date: "2026-08-08", income: 0, expense: 228, saving: -228 },
  { date: "2026-08-09", income: 0, expense: 80, saving: -80 },
  { date: "2026-08-10", income: 0, expense: 135, saving: -135 },
  { date: "2026-08-11", income: 0, expense: 88, saving: -88 },
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
  saving: {
    label: "Saving",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type Period = "week" | "month" | "quater" | "year"

export function MainChart() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  )

  const [period, setPeriod] = useState<Period>("month")

  const income = calculateByPeriod(
    transactions,
    "Income",
    period
  )

  const expense = calculateByPeriod(
    transactions,
    "Expense",
    period
  )

  console.log(income)
  console.log(expense)

  return (
    <Card
      className="
        brutal-card
        overflow-hidden
        rounded-none
        border-2
        py-0
      "
    >
      <CardHeader
        className="
          flex flex-col
          gap-4
          border-b-2
          border-[var(--border)]
          bg-[var(--card)]
          px-5
          py-5
          sm:flex-row
          sm:items-center
        "
      >
        <div className="grid flex-1 gap-1">
          <CardTitle
            className="
              text-lg
              font-black
              uppercase
              tracking-tight
              text-[var(--foreground)]
            "
          >
            Financial Overview
          </CardTitle>

          <CardDescription
            className="
              text-sm
              font-medium
              text-[var(--muted-foreground)]
            "
          >
            Income, expenses and savings over time
          </CardDescription>
        </div>

        <Select
          value={period}
          onValueChange={(value) =>
            setPeriod(value as Period)
          }
        >
          <SelectTrigger
            className="
              brutal-button
              h-10
              w-full
              rounded-none
              border-2
              border-[var(--border)]
              bg-[var(--card)]
              font-bold
              text-[var(--foreground)]
              shadow-[4px_4px_0_var(--shadow-color)]
              sm:ml-auto
              sm:w-[170px]
            "
          >
            <SelectValue placeholder="Select period" />
          </SelectTrigger>

          <SelectContent
            className="
              rounded-none
              border-2
              border-[var(--border)]
              bg-[var(--card)]
              text-[var(--foreground)]
              shadow-[4px_4px_0_var(--shadow-color)]
            "
          >
            <SelectItem
              value="year"
              className="
                rounded-none
                font-bold
                focus:bg-[var(--primary)]
                focus:text-[var(--primary-foreground)]
              "
            >
              Last 12 months
            </SelectItem>

            <SelectItem
              value="quater"
              className="
                rounded-none
                font-bold
                focus:bg-[var(--primary)]
                focus:text-[var(--primary-foreground)]
              "
            >
              Last 3 months
            </SelectItem>

            <SelectItem
              value="month"
              className="
                rounded-none
                font-bold
                focus:bg-[var(--primary)]
                focus:text-[var(--primary-foreground)]
              "
            >
              Last 30 days
            </SelectItem>

            <SelectItem
              value="week"
              className="
                rounded-none
                font-bold
                focus:bg-[var(--primary)]
                focus:text-[var(--primary-foreground)]
              "
            >
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent
        className="
          bg-[var(--card)]
          px-3
          pb-5
          pt-5
          sm:px-5
          sm:pb-6
          sm:pt-6
        "
      >
        <ChartContainer
          config={chartConfig}
          className="
            aspect-auto
            h-[280px]
            w-full
            sm:h-[320px]
            md:h-[360px]
          "
        >
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="fillIncome"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.45}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.03}
                />
              </linearGradient>

              <linearGradient
                id="fillExpense"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.03}
                />
              </linearGradient>

              <linearGradient
                id="fillSaving"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-saving)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-saving)"
                  stopOpacity={0.03}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeOpacity={0.18}
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={{
                stroke: "var(--border)",
                strokeWidth: 2,
              }}
              tickMargin={10}
              minTickGap={32}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 11,
                fontWeight: 700,
              }}
              tickFormatter={(value) => {
                const date = new Date(value)

                return date.toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )
              }}
            />

            <ChartTooltip
              cursor={{
                stroke: "var(--border)",
                strokeWidth: 2,
                strokeDasharray: "4 4",
              }}
              content={
                <ChartTooltipContent
                  className="
                    w-[180px]
                    rounded-none
                    border-2
                    border-[var(--border)]
                    bg-[var(--card)]
                    text-[var(--foreground)]
                    shadow-[4px_4px_0_var(--shadow-color)]
                  "
                  labelFormatter={(value) => {
                    return new Date(
                      value
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
              strokeWidth={3}
              activeDot={{
                r: 5,
                fill: "var(--primary)",
                stroke: "var(--border)",
                strokeWidth: 2,
              }}
            />

            <Area
              dataKey="expense"
              type="natural"
              fill="url(#fillExpense)"
              stroke="var(--color-expense)"
              strokeWidth={3}
              activeDot={{
                r: 5,
                fill: "var(--chart-3)",
                stroke: "var(--border)",
                strokeWidth: 2,
              }}
            />

            <Area
              dataKey="saving"
              type="natural"
              fill="url(#fillSaving)"
              stroke="var(--color-saving)"
              strokeWidth={3}
              activeDot={{
                r: 5,
                fill: "var(--chart-2)",
                stroke: "var(--border)",
                strokeWidth: 2,
              }}
            />

            <ChartLegend
              content={
                <ChartLegendContent
                  className="
                    pt-4
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-[var(--foreground)]
                  "
                />
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}