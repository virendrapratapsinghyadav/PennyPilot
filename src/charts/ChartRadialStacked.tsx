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
    color: "#2563EB",
  },
  cash: {
    label: "Cash",
    color: "#16A34A",
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
    <Card className="flex flex-col overflow-hidden border-0 shadow-sm">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-base font-semibold">
          Transactions by Payment Method
        </CardTitle>

        <CardDescription>
          {currentMonth} {currentYear}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  nameKey="type"
                  hideLabel
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-6">
                      <span className="text-muted-foreground">
                        {chartConfig[
                          name as keyof typeof chartConfig
                        ]?.label ?? name}
                      </span>

                      <span className="font-mono font-medium tabular-nums">
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
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
              strokeWidth={2}
              stroke="hsl(var(--background))"
            >
              <LabelList
                dataKey="type"
                className="fill-background"
                stroke="none"
                fontSize={12}
                fontWeight={600}
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

      <CardFooter className="flex-col gap-1 border-t bg-muted/30 px-6 py-4">
        <div className="text-2xl font-bold tracking-tight">
          {formatCurrency(totalTransactions)}
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Total transaction amount for {currentMonth}
        </div>
      </CardFooter>
    </Card>
  )
}