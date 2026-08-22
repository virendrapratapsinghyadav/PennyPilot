import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useTransactionStore } from "@/store/transactionStore";
import { calculateByPeriod } from "@/utils/transaction.utils";
import { useState } from "react";
import { AreaChart, CartesianGrid, XAxis, Area } from "recharts"


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
  { date: "2026-06-02", income: 2000, expense: 120, saving: 1880 },
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

  // August 2026
  { date: "2026-09-01", income: 15000, expense: 250, saving: 14750 },
  { date: "2026-09-02", income: 0, expense: 267.45, saving: -267.45 },
  { date: "2026-09-03", income: 0, expense: 200, saving: -200 },
  { date: "2026-09-04", income: 0, expense: 95, saving: -95 },
  { date: "2026-09-05", income: 0, expense: 30, saving: -30 },
  { date: "2026-09-06", income: 0, expense: 110, saving: -110 },
  { date: "2026-09-07", income: 0, expense: 50, saving: -50 },
  { date: "2026-09-08", income: 0, expense: 228, saving: -228 },
  { date: "2026-09-09", income: 0, expense: 80, saving: -80 },
  { date: "2026-09-10", income: 0, expense: 135, saving: -135 },
  { date: "2026-09-11", income: 0, expense: 88, saving: -88 },


  // August 2026
  { date: "2026-10-01", income: 15000, expense: 250, saving: 14750 },
  { date: "2026-10-02", income: 0, expense: 267.45, saving: -267.45 },
  { date: "2026-10-03", income: 0, expense: 200, saving: -200 },
  { date: "2026-10-04", income: 0, expense: 95, saving: -95 },
  { date: "2026-10-05", income: 0, expense: 30, saving: -30 },
  { date: "2026-10-06", income: 0, expense: 110, saving: -110 },
  { date: "2026-10-07", income: 0, expense: 50, saving: -50 },
  { date: "2026-10-08", income: 0, expense: 228, saving: -228 },
  { date: "2026-10-09", income: 0, expense: 80, saving: -80 },
  { date: "2026-10-10", income: 0, expense: 135, saving: -135 },
  { date: "2026-10-11", income: 0, expense: 88, saving: -88 },
];

const chartConfig = {
    income: {
        label: "income",
        color: "var(--chart-1)",
    },
    expense: {
        label: "expense",
        color: "var(--chart-2)",
    },
    saving: {
        label: "saving",
        color: "red",
    },
} satisfies ChartConfig

type Period = "week" | "month" |"quater" | "year"

export function MainChart() {

    const transactions = useTransactionStore((state)=>state.transactions)

    const[period, setPeriod] = useState<Period>("month");
    const income = calculateByPeriod(transactions, "Income", period);
    const expense = calculateByPeriod(transactions, "Expense", period);
    console.log(income)
    console.log(expense)

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Area Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing total transaction types
                    </CardDescription>
                </div>
                <Select>
                    <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex">
                        <SelectValue placeholder="Last 30 days" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value=" 1 year" className="rounded-lg">
                            Last 12 months
                        </SelectItem>
                        <SelectItem value="3 months" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="1 month" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7 days" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-sav)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />

                        {/* Conditional rendering-> days/months/year */}
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        {/* Conditional rendering-> days/months/year */}
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="income"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="var(--color-mobile)"
                            stackId="a"
                        />
                        <Area
                            dataKey="expense"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke="var(--color-desktop)"
                            stackId="a"
                        />
                        <Area
                            dataKey="saving"
                            type="natural"
                            fill="url(#F4C95D)"
                            stroke="#F4C95D"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}