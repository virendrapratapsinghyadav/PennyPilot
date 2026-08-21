import { TrendingUp } from "lucide-react"
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
import { useTransactionStore } from "@/store/transactionStore"
import { calculateMonthly, getPercentage } from "@/utils/transaction.utils"

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
];

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(142, 76%, 36%)",
  },
  expense: {
    label: "Expense",
    color: "hsl(0, 84%, 60%)",
  },
} satisfies ChartConfig

export function IncomeVsExpenseChart() {

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const transactions = useTransactionStore((state) => state.transactions)

  const incomeEachMonth = calculateMonthly(transactions, "Income");
  const expenseEachMonth = calculateMonthly(transactions, "Expense");

  const currentDifference =
    (incomeEachMonth[currentMonth] ?? 0) -
    (expenseEachMonth[currentMonth] ?? 0);

  const previousDifference =
    (incomeEachMonth[currentMonth - 1] ?? 0) -
    (expenseEachMonth[currentMonth - 1] ?? 0);

  const percentageChange = getPercentage(previousDifference, currentDifference);

  const chartData = Array.from({ length: 12 }, (_, month) => ({
    month: monthNames[month],
    income: incomeEachMonth[month] ?? 0,
    expense: expenseEachMonth[month] ?? 0,
  }));


  return (

    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">
          Income vs Expense
        </CardTitle>

        <CardDescription className="text-xs sm:text-sm">
          January - Present, {currentYear}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-55 w-full sm:h-70 md:h-80 lg:h-87.5"
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
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // tickFormatter={(value) => value.slice(0, 3)}
              fontSize={12}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar
              dataKey="income"
              fill="var(--color-income)"
              radius={4}
            />

            <Bar
              dataKey="expense"
              fill="var(--color-expense)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by {percentageChange}% this month
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">
          Showing income and expenses for {currentYear}
        </div>
      </CardFooter>
    </Card>
  )
}