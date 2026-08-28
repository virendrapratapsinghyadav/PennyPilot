import { MainChart } from "@/charts/MainChart"
import { IncomeVsExpenseChart } from "@/charts/IncomeVsExpenseChart"
import { SpendingTrendsChart } from "@/charts/SpendingTrendsChart"
import { ChartRadialLabel } from "@/charts/ChartRadialLabel"
import { SavingRatesChart } from "@/charts/SavingRatesChart"

const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b-2 border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Financial Overview
          </p>

          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Analytics
          </h1>

          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Understand your income, expenses, spending patterns, and savings.
          </p>
        </div>

        <div className="w-fit border-2 border-border bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-[3px_3px_0_var(--shadow-color)]">
          Financial Data
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Main overview */}
        <div className="min-w-0 lg:col-span-3 brutal-card brutal-hover overflow-hidden">
          <MainChart />
        </div>

        {/* Spending trends */}
        <div className="min-w-0 brutal-card brutal-hover overflow-hidden">
          <SpendingTrendsChart />
        </div>

        {/* Spending distribution */}
        <div className="min-w-0 brutal-card brutal-hover overflow-hidden">
          <ChartRadialLabel />
        </div>

        {/* Saving rate */}
        <div className="min-w-0 brutal-card brutal-hover overflow-hidden">
          <SavingRatesChart />
        </div>

        {/* Income vs Expense */}
        <div className="min-w-0 lg:col-span-3 brutal-card brutal-hover overflow-hidden">
          <IncomeVsExpenseChart />
        </div>
      </div>
    </div>
  )
}

export default Analytics
