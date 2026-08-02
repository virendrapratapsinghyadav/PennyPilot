import { create } from "zustand";
import type { Payment } from "@/components/payments/Columns";

interface TransactionStore {
  transactions: Payment[];
  setTransactions: (transactions: Payment[]) => void;
  addTransaction: (transaction: Payment) => void;
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],

  setTransactions: (transactions) => set({ transactions }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  clearTransactions: () => set({ transactions: [] }),
}));
