import { MainChart } from "@/charts/MainChart"
import { IncomeVsExpenseChart } from "@/charts/IncomeVsExpenseChart"
import { SpendingTrendsChart } from "@/charts/SpendingTrendsChart"
import { ChartRadialLabel } from "@/charts/ChartRadialLabel"
import { SavingRatesChart } from "@/charts/SavingRatesChart"

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {/* 1. Full width */}
      <div className="lg:col-span-3">
        <MainChart />
      </div>

      {/* 2, 3, 4. Equal width + equal height */}
      <div className="min-w-0">
        <SpendingTrendsChart />
      </div>

      <div className="min-w-0">
        <ChartRadialLabel />
      </div>

      <div className="min-w-0">
        <SavingRatesChart />
      </div>

      {/* 5. Full width */}
      <div className="lg:col-span-3">
        <IncomeVsExpenseChart />
      </div>
    </div>
  )
}

export default Analytics