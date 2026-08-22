import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from "recharts"
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
import { getExpenseByCategory } from "@/utils/transaction.utils"

const chartConfig = {
    amount: {
        label: "Amount",
        color: "hsl(0 72% 60%)",
    },
} satisfies ChartConfig

const categoryLabels: Record<string, string> = {
    Groceries: "Groceries",
    EatingOut: "Eating Out",
    BeverageSnacks: "Beverages & Snacks",
    Clothing: "Clothing",
    Shoes: "Shoes",
    Fuel: "Fuel",
    PublicTransport: "Public Transport",
    Others: "Others",
}

const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value)

export function ExpenseByCategoryChart() {
    const transactions = useTransactionStore((state) => state.transactions)

    const expensesByCategory = getExpenseByCategory(transactions)

    const chartData = Object.entries(expensesByCategory).map(
        ([category, amount]) => ({
            category,
            amount,
        }),
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
                <CardDescription>
                    Your spending breakdown for the selected period
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-50 w-full md:h-80"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 2,
                            right: 60,
                        }}
                    >
                        <CartesianGrid horizontal={false} />

                        <YAxis
                            dataKey="category"
                            type="category"
                            hide
                        />

                        <XAxis
                            dataKey="amount"
                            type="number"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `₹${value}`}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    formatter={(value) =>
                                        formatINR(Number(value))
                                    }
                                />
                            }
                        />

                        <Bar
                            dataKey="amount"
                            fill="var(--color-amount)"
                            radius={6}
                        >
                            <LabelList
                                dataKey="category"
                                position="insideLeft"
                                offset={12}
                                className="fill-white font-medium"
                                fontSize={12}
                                formatter={(value) =>
                                    categoryLabels[String(value)] ??
                                    String(value)
                                }
                            />

                            <LabelList
                                dataKey="amount"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value) =>
                                    formatINR(Number(value))
                                }
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}