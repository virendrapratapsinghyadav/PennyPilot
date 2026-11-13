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
import type { Payment } from "@/components/payments/Columns";

import {
  AreaChart,
  CartesianGrid,
  XAxis,
  Area,
} from "recharts"

type Period = "week" | "month" | "quater" | "year";

type ChartData = {
  date: string;
  income: number;
  expense: number;
  saving: number;
};

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

export function MainChart() {
  const transactions = useTransactionStore(
    (state) => state.transactions
  );

  const [period, setPeriod] = useState<Period>("month");

  function getChartData(
    transactions: Payment[],
    period: Period
  ): ChartData[] {

    const income = calculateByPeriod(
      transactions,
      "Income",
      period
    );

    const expense = calculateByPeriod(
      transactions,
      "Expense",
      period
    );

    const map = new Map<string, ChartData>();

    const addData = (
      data: { date: Date; amount: number }[],
      type: "income" | "expense"
    ) => {
      for (const { date, amount } of data) {
        const key = [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0")
        ].join("-");

        const item = map.get(key) ?? {
          date: key,
          income: 0,
          expense: 0,
          saving: 0
        };

        item[type] += amount;
        item.saving = item.income - item.expense;

        map.set(key, item);
      }
    };

    addData(income, "income");
    addData(expense, "expense");

    return [...map.values()].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }

  const charData = getChartData(transactions, period);


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
          border-border
          bg-card
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
              text-foreground
            "
          >
            Financial Overview
          </CardTitle>

          <CardDescription
            className="
              text-sm
              font-medium
              text-muted-foreground
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
              border-border
              bg-card
              font-bold
              text-foreground
              shadow-[4px_4px_0_var(--shadow-color)]
              sm:ml-auto
              sm:w-42.5
            "
          >
            <SelectValue placeholder="Select period" />
          </SelectTrigger>

          <SelectContent
            className="
              rounded-none
              border-2
              border-border
              bg-card
              text-foreground
              shadow-[4px_4px_0_var(--shadow-color)]
            "
          >
            <SelectItem
              value="year"
              className="
                rounded-none
                font-bold
                focus:bg-primary
                focus:text-primary-foreground
              "
            >
              Last 12 months
            </SelectItem>

            <SelectItem
              value="quater"
              className="
                rounded-none
                font-bold
                focus:bg-primary
                focus:text-primary-foreground
              "
            >
              Last 3 months
            </SelectItem>

            <SelectItem
              value="month"
              className="
                rounded-none
                font-bold
                focus:bg-primary
                focus:text-primary-foreground
              "
            >
              Last 30 days
            </SelectItem>

            <SelectItem
              value="week"
              className="
                rounded-none
                font-bold
                focus:bg-primary
                focus:text-primary-foreground
              "
            >
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent
        className="
          bg-card
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
            h-70
            w-full
            sm:h-80
            md:h-90
          "
        >
          <AreaChart
            data={charData}
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
                    w-45
                    rounded-none
                    border-2
                    border-border
                    bg-card
                    text-foreground
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
                    text-foreground
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