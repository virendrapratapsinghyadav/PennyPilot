import type { Payment } from "@/components/payments/Columns";
import type {
  CategorySpending,
  MonthlyFinancialContext,
  MonthlyFinancialTotals,
} from "../types";

const sumType = (transactions: Payment[], type: string): number =>
  transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);

const getTotals = (transactions: Payment[]): MonthlyFinancialTotals => {
  const income = sumType(transactions, "Income");
  const expense = sumType(transactions, "Expense");
  const savings = income - expense;

  return {
    income,
    expense,
    savings,
    savingRate: income > 0 ? (savings / income) * 100 : 0,
  };
};

const getCategories = (transactions: Payment[]): CategorySpending[] => {
  const totals = new Map<string, number>();

  for (const transaction of transactions) {
    if (transaction.type !== "Expense") continue;

    const category = transaction.category?.trim() || "Uncategorized";

    totals.set(
      category,
      (totals.get(category) ?? 0) + transaction.amount,
    );
  }

  const totalExpenses = [...totals.values()].reduce(
    (total, amount) => total + amount,
    0,
  );

  return [...totals.entries()]
    .map(([name, amount]) => ({
      name,
      amount,
      percentage:
        totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

const percentageChange = (
  previous: number,
  current: number,
): number | null => {
  if (previous === 0) {
    return current === 0 ? 0 : null;
  }

  return Number(
    (((current - previous) / Math.abs(previous)) * 100).toFixed(2),
  );
};

const monthLabel = (date: Date): string =>
  date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

const isValidDate = (date: unknown): date is Date =>
  date instanceof Date && !Number.isNaN(date.getTime());

export const buildMonthlyContext = (
  transactions: Payment[],
  referenceDate = new Date(),
): MonthlyFinancialContext => {
  const currentStart = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    1,
  );

  const previousStart = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth() - 1,
    1,
  );

  const getMonthTransactions = (start: Date): Payment[] =>
    transactions.filter((transaction) => {
      const date = transaction.date;

      return (
        isValidDate(date) &&
        date.getFullYear() === start.getFullYear() &&
        date.getMonth() === start.getMonth()
      );
    });

  const currentTransactions = getMonthTransactions(currentStart);
  const previousTransactions = getMonthTransactions(previousStart);

  const currentMonth = getTotals(currentTransactions);
  const previousMonth = getTotals(previousTransactions);

  return {
    currency: "INR",
    currentMonthLabel: monthLabel(currentStart),
    previousMonthLabel: monthLabel(previousStart),

    currentMonth,
    previousMonth,

    changes: {
      income: percentageChange(
        previousMonth.income,
        currentMonth.income,
      ),
      expense: percentageChange(
        previousMonth.expense,
        currentMonth.expense,
      ),
      savings: percentageChange(
        previousMonth.savings,
        currentMonth.savings,
      ),
    },

    categories: getCategories(currentTransactions),
    previousCategories: getCategories(previousTransactions),
  };
};