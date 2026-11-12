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
        color: "var(--chart-1)",
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
    const transactions = useTransactionStore(
        (state) => state.transactions
    )

    const expensesByCategory = getExpenseByCategory(transactions)

    const chartData = Object.entries(expensesByCategory).map(
        ([category, amount]) => ({
            category,
            amount,
        }),
    )

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
                    Expenses by Category
                </CardTitle>

                <CardDescription
                    className="
                        text-sm
                        font-medium
                        text-muted-foreground
                    "
                >
                    Your spending breakdown throughout the year
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
                        aspect-auto
                        h-70
                        w-full
                        md:h-90
                    "
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 4,
                            right: 70,
                            top: 4,
                            bottom: 4,
                        }}
                        barCategoryGap="18%"
                    >
                        <CartesianGrid
                            horizontal={false}
                            stroke="var(--border)"
                            strokeOpacity={0.18}
                            strokeDasharray="4 4"
                        />

                        <YAxis
                            dataKey="category"
                            type="category"
                            hide
                        />

                        <XAxis
                            dataKey="amount"
                            type="number"
                            tickLine={false}
                            axisLine={{
                                stroke: "var(--border)",
                                strokeWidth: 2,
                            }}
                            tick={{
                                fill: "var(--muted-foreground)",
                                fontSize: 11,
                                fontWeight: 700,
                            }}
                            tickFormatter={(value) =>
                                `₹${Number(value).toLocaleString("en-IN")}`
                            }
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
                                        border-border
                                        bg-card
                                        text-foreground
                                        shadow-[4px_4px_0_var(--shadow-color)]
                                    "
                                    formatter={(value) =>
                                        formatINR(Number(value))
                                    }
                                />
                            }
                        />

                        <Bar
                            dataKey="amount"
                            fill="var(--color-amount)"
                            radius={0}
                            stroke="var(--border)"
                            strokeWidth={1}
                        >
                            <LabelList
                                dataKey="category"
                                position="insideLeft"
                                offset={10}
                                className="
                                    fill-primary-foreground
                                    font-black
                                    uppercase
                                "
                                fontSize={11}
                                formatter={(value) =>
                                    categoryLabels[String(value)] ??
                                    String(value)
                                }
                            />

                            <LabelList
                                dataKey="amount"
                                position="right"
                                offset={10}
                                className="
                                    fill-foreground
                                    font-black
                                "
                                fontSize={11}
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