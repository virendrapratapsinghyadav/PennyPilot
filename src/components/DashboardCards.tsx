import { BanknoteArrowDown, EllipsisVertical, TrendingUp } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface DashboardCardProps {
    title: string,
    amount: number,
    percentage: number,
    change: number
}

const DashboardCards = ({title, amount, percentage, change}:DashboardCardProps) => {
    
  return (
    <div className="w-fit">
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BanknoteArrowDown size={20}/>
                    <span className="text-xl font-semibold">{title}</span>
                </div>
                <div>
                    <EllipsisVertical size={20}/>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-1">
            <span className="text-2xl font-medium">₹{amount}</span>
            <span className="border rounded-2xl px-1 flex items-center gap-1">
                <TrendingUp size={16}/>
                <p className="text-slate-500">{percentage}%</p>
            </span>
        </CardContent>
        <CardFooter className="flex items-center gap-1">
            <span className="font-medium">+₹{change}</span>
            <span className="text-slate-500">from last month</span>
        </CardFooter>
      </Card>
    </div>
  )
}

export default DashboardCards
