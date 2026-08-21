import {
    Card,
    CardContent,
    CardDescription,
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
import { calculateDaily } from "@/utils/transaction.utils"
import { AreaChart, CartesianGrid, XAxis, Area } from "recharts"

const chartConfig = {
    expense: {
        label: "Expense",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

const parseLocalDate = (value: string) => {
    const [year, month, day] = value.split("-").map(Number)

    return new Date(year, month - 1, day)
}

const formatDate = (value: unknown) => {
    if (typeof value !== "string") return ""

    return parseLocalDate(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    })
}

export function SpendingTrendsChart() {
    const transactions = useTransactionStore(
        (state) => state.transactions
    )

    const dailyExpenses = calculateDaily(transactions, "Expense")

    const chartData = Object.entries(dailyExpenses)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, amount]) => ({
            date,
            expense: amount,
        }))

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Spending Trends</CardTitle>
                    <CardDescription>
                        Daily expense trends
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-50 w-full md:h-80"
                >
                    <AreaChart
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                            top: 10,
                            bottom: 0,
                        }}
                    >
                        <defs>
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
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-expense)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={formatDate}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={formatDate}
                                    indicator="dot"
                                />
                            }
                        />

                        <Area
                            dataKey="expense"
                            type="monotone"
                            fill="url(#fillExpense)"
                            stroke="var(--color-expense)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}