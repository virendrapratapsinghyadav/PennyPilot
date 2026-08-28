import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"
import TransactionDialog from "@/components/TransactionDialog"
import DashboardCards from "@/components/DashboardCards"
import { useUserStore } from "@/store/store";
import DemoPage from "@/components/payments/Page"
import { getPercentage, getTotalByType, getTransactionsByMonth } from "@/utils/transaction.utils"
import { useTransactionStore } from "@/store/transactionStore"
import { ChartRadialStacked } from "@/charts/ChartRadialStacked"
import { ExpenseByCategoryChart } from "@/charts/ExpenseByCategoryChart"


const Hero = () => {
  const user = useUserStore((state) => state.user);
  const transaction = useTransactionStore((state) => state.transactions)

  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  //Income
  const previousIncome = getTransactionsByMonth(transaction, currentMonth-1, currentYear);
  const latestIncome = getTransactionsByMonth(transaction, currentMonth, currentYear);
  const previousNetIncome = getTotalByType(previousIncome, "Income");
  const latestNetIncome = getTotalByType(latestIncome, "Income");
  const monthlyIncomeChange = latestNetIncome - previousNetIncome;
  const monthlyIncomeChangePercentage = getPercentage(previousNetIncome, latestNetIncome)

  //Expense
  const previousExpense = getTransactionsByMonth(transaction, currentMonth-1, currentYear);
  const latestExpense = getTransactionsByMonth(transaction, currentMonth, currentYear);
  const previousNetExpense = getTotalByType(previousExpense, "Expense");
  const latestNetExpense = getTotalByType(latestExpense, "Expense");
  const monthlyExpenseChange = latestNetIncome - previousNetExpense;
  const monthlyExpenseChangePercentage = getPercentage(previousNetExpense, latestNetExpense)

  //Saving
  const latestNetSaving = latestNetIncome - latestNetExpense;
  const previousNetSaving = previousNetIncome - previousNetExpense;
  const monthlySavingChange = latestNetSaving - previousNetSaving;
  const monthlySavingChangePercentage = getPercentage(previousNetSaving, latestNetSaving)

  return (
    <div className="min-h-full space-y-6">

      {/* Top Section */}
      <div className="flex flex-col gap-4 border-b-2 border-border pb-5 md:flex-row md:items-center md:justify-between">

        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />

          <Input
            type="text"
            className="brutal-input h-11 pl-10"
            placeholder="Search anything"
          />
        </div>

        {/* Profile */}
        <Link to="profile" className="w-fit">
          <div className="brutal-button flex items-center gap-2 bg-card px-3 py-2 transition-colors hover:bg-muted">
            <div className="flex h-7 w-7 items-center justify-center border-2 border-border bg-primary">
              <img
                src="/Logo.png"
                width="18"
                height="18"
                className="object-contain"
              />
            </div>

            <div className="max-w-40 truncate text-sm font-bold text-foreground">
              {user?.name}
            </div>
          </div>
        </Link>
      </div>


      {/* Main Section */}
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 border-2 border-border bg-card p-5 shadow-[4px_4px_0_var(--shadow-color)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Financial Overview
            </p>

            <h1 className="text-2xl font-black tracking-tight text-card-foreground sm:text-3xl">
              Transactions
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View and manage all your income and expenses in one place.
            </p>
          </div>

          <div className="shrink-0">
            <TransactionDialog />
          </div>
        </div>


        {/* Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">

          {/* Left Section */}
          <div className="min-w-0 space-y-6">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DashboardCards
                classname="income-card"
                title="Income"
                amount={latestNetIncome}
                percentage={monthlyIncomeChangePercentage}
                change={monthlyIncomeChange}
              />

              <DashboardCards
                classname="expense-card"
                title="Expense"
                amount={latestNetExpense}
                percentage={monthlyExpenseChangePercentage}
                change={monthlyExpenseChange}
              />

              <DashboardCards
                classname="savings-card"
                title="Saving"
                amount={latestNetSaving}
                percentage={monthlySavingChangePercentage}
                change={monthlySavingChange}
              />
            </div>

            {/* Transactions */}
            <div className="brutal-card overflow-hidden">
              <DemoPage />
            </div>
          </div>


          {/* Right Section */}
          <div className="min-w-0 space-y-6">

            {/* Spending Overview */}
            <div className="brutal-card brutal-hover overflow-hidden">
              <ChartRadialStacked />
            </div>

            {/* Expense Categories */}
            <div className="brutal-card brutal-hover overflow-hidden">
              <ExpenseByCategoryChart />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
