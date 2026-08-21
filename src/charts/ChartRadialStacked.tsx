import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
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

export const description = "A radial chart with stacked sections"

const chartData = [{ month: "january", salary: 23570, freelance: 2300, others: 3580 }]

const chartConfig = {
  salary: {
    label: "salary",
    color: "green",
  },
  freelance: {
    label: "freelance",
    color: "var(--chart-2)",
  },
  others: {
    label: "others",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartRadialStacked() {
  const totalIncome = chartData[0].salary + chartData[0].freelance + chartData[0].others

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle> Income Breakdown</CardTitle>
        <CardDescription>August 2026</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={110}
          >
            <RadialBar
              dataKey="others"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-others)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="freelance"
              fill="var(--color-freelance)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="salary"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-salary)"
              className="stroke-transparent stroke-2"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {`₹${totalIncome.toLocaleString()}`}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Total Income
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total income for this month
        </div>
      </CardFooter>
    </Card>
  )
}
