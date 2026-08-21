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
    <div className="h-screen bg-red-200 rounded-xl">
      {/* Top Section */}
      <div className="flex gap-10">
        <div className="flex-1 relative">
          <Search className="absolute  left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input type="text" className="pl-8" placeholder="Search anything" />
        </div>
        <Link to={'profile'}>
          <div className="flex items-center justify-center border px-2">
            <div className="px-1">
              <img src="/Logo.png" width={'15px'} height={'15px'} className="rounded" />
            </div>
            <div>
              {user?.name}
            </div>
          </div>
        </Link>
      </div>


      {/* Bottom Section */}
      <div className="h-full">
        {/* Bottom top section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Transactions</h1>
            <p className="text-slate-500 text-sm">
              View and manage all your income and expenses in one place
            </p>
          </div>
          <div>
            <TransactionDialog />
          </div>
        </div>

        {/* Bottom bottom section */}
        <div className="flex border gap-5 justify-between">
          {/* Left section */}
          <div className="flex flex-col flex-1 border">
            {/* Left top section */}
            <div className="flex gap-10 p-1">
              <DashboardCards
                title="Income"
                amount={latestNetIncome}
                percentage={monthlyIncomeChangePercentage}
                change={monthlyIncomeChange}
              />
              <DashboardCards
                title="Expense"
                amount={latestNetExpense}
                percentage={monthlyExpenseChangePercentage}
                change={monthlyExpenseChange}
              />
              <DashboardCards
                title="Saving"
                amount={latestNetSaving}
                percentage={monthlySavingChangePercentage}
                change={monthlySavingChange}
              />
            </div>

            {/* Left bottom section */}
            <div>
              <DemoPage />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-125">
            {/* Right top Section */}
            <div>
              <ChartRadialStacked/>
            </div>

            {/* Right bottom Section */}
            <div>
              <ExpenseByCategoryChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
