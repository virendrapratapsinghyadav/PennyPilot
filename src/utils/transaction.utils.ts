import type { Payment } from "@/components/payments/Columns";

//Amount Calculation Utility
export const getTotalByType = (transactions: Payment[], type: string) => {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);
};

//ByCurrentMonth utility
export const getTransactionsByMonth = (
  transactions: Payment[],
  month: number,
  year: number,
) => {
  return transactions.filter((transaction) => {
    const date = transaction.date;
    const transactionMonth = date.getMonth() + 1;
    const transactionYear = date.getFullYear();
    return transactionMonth === month && transactionYear === year;
  });
};

//Percentage Utility
export const getPercentage = (
  previousMonth: number,
  currentMonth: number,
) => {
  if (previousMonth === 0) {
    return "0.00";
  }
  const monthlyChangePercentage =
    ((currentMonth - previousMonth) / Math.abs(previousMonth)) * 100;
  return monthlyChangePercentage.toFixed(2);
};

//Expense By Categories
export const getExpenseByCategory = (transactions: Payment[]) => {
  const ans = transactions.filter((item) => item.type === "Expense");
  const result = ans.reduce(
    (acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    },
    {} as Record<string, number>,
  );
  return result;
};

export const calculateDaily = (
  transactions: Payment[],
  type: string,
) => {
  return transactions.reduce<Record<string, number>>(
    (acc, transaction) => {
      if (transaction.type !== type) return acc;

      const date = transaction.date;

      const dateKey = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      acc[dateKey] =
        (acc[dateKey] ?? 0) + Number(transaction.amount);

      return acc;
    },
    {},
  );
};


export const calculateMonthly = (transactions: Payment[], type: string) => {
  const currentYear = new Date().getFullYear();

  const transactionsType = transactions.filter(
    (transaction) =>
      transaction.type === type &&
      transaction.date.getFullYear() === currentYear,
  );

  return transactionsType.reduce<Record<number, number>>((acc, transaction) => {
    const month = transaction.date.getMonth();
    acc[month] = (acc[month] || 0) + Number(transaction.amount);
    return acc;
  }, {});
};

export const calculateMonthlySavings = (
  income: Record<number, number>,
  expense: Record<number, number>,
) => {
  const savings: Record<number, number> = {};

  for (let month = 0; month < 12; month++) {
    const incomeAmount = income[month] ?? 0;
    const expenseAmount = expense[month] ?? 0;

    savings[month] = incomeAmount - expenseAmount;
  }

  return savings;
};

export const calculateSavingRate = (
  income: Record<number, number>,
  saving: Record<number, number>,
) => {
  const savingRate: Record<number, number> = {};

  for (let month = 0; month < 12; month++) {
    const incomeAmount = income[month] ?? 0;
    const savingAmount = saving[month] ?? 0;

    savingRate[month] =
      incomeAmount === 0
        ? 0
        : (savingAmount / incomeAmount) * 100;
  }

  return savingRate;
};

