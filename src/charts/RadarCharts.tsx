import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

const RadarCharts = () => {
  return (
    <div>
      <Card>
        <CardHeader>
            <CardTitle>Radar Chart - Dots</CardTitle>
            <CardDescription>
                Showing total visitors for the last 6 months
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
                <RadarChart data={chartData}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                    <PolarAngleAxis dataKey={"month"}/>
                    <PolarGrid/>
                    <Radar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    fillOpacity={0.6}
                    dot={{
                        r: 4,
                        fillOpacity: 1,
                    }}
                    />
                </RadarChart>
            </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default RadarCharts
