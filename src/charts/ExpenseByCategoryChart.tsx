import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
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


const chartData = [
    { category: "Groceries", amount: 2750 },
    { category: "EatingOut", amount: 2000 },
    { category: "BeverageSnacks", amount: 800 },
    { category: "Clothing", amount: 1730 },
    { category: "Shoes", amount: 2750 },
    { category: "Fuel", amount: 800 },
    { category: "PublicTransport", amount: 2300 },
    { category: "Others", amount: 400 },
]

const chartConfig = {
    amount: {
        label: "Amount",
        color: "green",
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
                    className="aspect-auto h-50 md:h-80 w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 60,
                            left: 2,
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
                                    formatter={(value) => formatINR(Number(value))}
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
                                formatter={(value) => categoryLabels[String(value)] ?? String(value)}
                            />
                            <LabelList
                                dataKey="amount"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value) => formatINR(Number(value))}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}