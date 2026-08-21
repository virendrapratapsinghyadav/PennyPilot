import { TrendingUp } from "lucide-react"
import { LabelList, RadialBar, RadialBarChart } from "recharts"
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
import { getExpenseByCategory } from "@/utils/transaction.utils"

export const description = "A radial chart with a label"

const getColor = (index: number, total: number) => {
  const hue = (index * 360) / total;
  return `hsl(${hue}, 70%, 55%)`;
};

const chartConfig = {
  amount: {
    label: "Amount"
  },
} satisfies ChartConfig;


export function ChartRadialLabel() {

  const transactions = useTransactionStore((state) => state.transactions);
  
  const expenseByCategory = getExpenseByCategory(transactions);

  const chartData = Object.entries(expenseByCategory).map(
    ([category, amount], index, categories) => ({
      category,
      amount,
      fill: getColor(index, categories.length)
    })
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>August 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={20}
            outerRadius={120}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="category" />}
            />
            <RadialBar dataKey="amount" background>
              <LabelList
                position="insideStart"
                dataKey="category"
                className="fill-black capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for this month
        </div>
      </CardFooter>
    </Card>
  )
}
