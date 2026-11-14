
import { create } from "zustand";
import type { Payment, TransactionData } from "@/types/transaction.types";

import {
  createTransactionDocument,
  deleteTransactionDocument,
  subscribeToTransactions,
} from "@/firebase/transaction.service";


export interface TransactionStore {
  transactions: TransactionData[];

  setTransactions: (transactions: TransactionData[]) => void;

  addTransaction: (
    userId: string,
    data: Payment
  ) => Promise<void>;

  subscribeTransactions: (userId: string) => () => void;

  deleteTransaction: (
    userId: string,
    tid: string
  ) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>(
  (set) => ({
    transactions: [],

    setTransactions: (transactions) =>
      set({ transactions }),

    // CREATE
    addTransaction: async (userId, data) => {
      const newTransaction =
        await createTransactionDocument(userId, data);

      set((state) => ({
        transactions: [
          newTransaction,
          ...state.transactions,
        ],
      }));
    },

    // FETCH + REAL-TIME LISTENER
    subscribeTransactions: (userId) => {
      return subscribeToTransactions(
        userId,
        (transactions) => {
          set({ transactions });
        },
        (error) => {
          console.error("Transaction listener error:", error);
        }
      );
    },

    // DELETE
    deleteTransaction: async (userId, tid) => {
      await deleteTransactionDocument(userId, tid);
    },
  })
);
