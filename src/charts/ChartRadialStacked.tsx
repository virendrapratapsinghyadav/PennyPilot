import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { useTransactionStore } from "@/store/transactionStore"
import { getTotalByMethod } from "@/utils/transaction.utils"

const chartConfig = {
  online: {
    label: "Online",
    color: "var(--chart-4)",
  },
  cash: {
    label: "Cash",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartRadialStacked() {
  const currentMonth = new Date().toLocaleString("en-US", {
    month: "long",
  })

  const currentYear = new Date().getFullYear()

  const transactions = useTransactionStore(
    (state) => state.transactions
  )

  const totalOnlineTransactions = getTotalByMethod(
    transactions,
    "Online"
  )

  const totalCashTransactions = getTotalByMethod(
    transactions,
    "Cash"
  )

  const totalTransactions =
    totalOnlineTransactions + totalCashTransactions

  const chartData = [
    {
      type: "online",
      transactions: totalOnlineTransactions,
      fill: "var(--color-online)",
    },
    {
      type: "cash",
      transactions: totalCashTransactions,
      fill: "var(--color-cash)",
    },
  ]

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`

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
          Transactions by Payment Method
        </CardTitle>

        <CardDescription
          className="
            text-sm
            font-medium
            text-[var(--muted-foreground)]
          "
        >
          {currentMonth} {currentYear}
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
            [&_.recharts-text]:fill-[var(--foreground)]
          "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  nameKey="type"
                  hideLabel
                  className="
                    rounded-none
                    border-2
                    border-[var(--border)]
                    bg-[var(--card)]
                    text-[var(--foreground)]
                    shadow-[4px_4px_0_var(--shadow-color)]
                  "
                  formatter={(value, name) => (
                    <div
                      className="
                        flex w-full
                        items-center
                        justify-between
                        gap-6
                      "
                    >
                      <span
                        className="
                          font-medium
                          text-[var(--muted-foreground)]
                        "
                      >
                        {chartConfig[
                          name as keyof typeof chartConfig
                        ]?.label ?? name}
                      </span>

                      <span
                        className="
                          font-mono
                          font-black
                          tabular-nums
                          text-[var(--foreground)]
                        "
                      >
                        ₹{Number(value).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                />
              }
            />

            <Pie
              data={chartData}
              dataKey="transactions"
              nameKey="type"
              innerRadius={58}
              outerRadius={98}
              paddingAngle={3}
              strokeWidth={2}
              stroke="var(--card)"
            >
              <LabelList
                dataKey="type"
                className="
                  fill-[var(--primary-foreground)]
                  font-black
                  uppercase
                "
                stroke="none"
                fontSize={11}
                fontWeight={800}
                formatter={(value) =>
                  chartConfig[
                    value as keyof typeof chartConfig
                  ]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter
        className="
          flex-col
          gap-1
          border-t-2
          border-border
          rounded-none
          bg-muted
          px-5 py-4
        "
      >
        <div
          className="
            text-2xl
            font-black
            tracking-tight
            text-foreground
          "
        >
          {formatCurrency(totalTransactions)}
        </div>

        <div
          className="
            text-center
            text-xs
            font-medium
            uppercase
            tracking-wide
            text-[var(--muted-foreground)]
          "
        >
          Total transaction amount for {currentMonth}
        </div>
      </CardFooter>
    </Card>
  )
}