export interface MonthlyFinancialTotals {
  income: number;
  expense: number;
  savings: number;
  savingRate: number;
}

export interface CategorySpending {
  name: string;
  amount: number;
  percentage: number;
}

export interface MonthlyFinancialContext {
  currency: string;
  currentMonthLabel: string;
  previousMonthLabel: string;

  currentMonth: MonthlyFinancialTotals;
  previousMonth: MonthlyFinancialTotals;

  changes: {
    income: number | null;
    expense: number | null;
    savings: number | null;
  };

  categories: CategorySpending[];
  previousCategories: CategorySpending[];
}