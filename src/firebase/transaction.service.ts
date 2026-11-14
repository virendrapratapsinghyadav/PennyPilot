import { db } from "./config.service";
import type { Payment, TransactionData } from "@/types/transaction.types";

import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";


// CREATE TRANSACTION
export const createTransactionDocument = async (
  userId: string,
  data: Payment,
) => {
  try {
    const transactionRef = await addDoc(
      collection(db, "users", userId, "transactions"),
      {
        ...data,
        createdAt: serverTimestamp(),
      },
    );

    return {
      ...data,
      id: transactionRef.id,
    };
  } catch (error) {
    console.error("Transaction creation error:", error);
    throw error;
  }
};

// SUBSCRIBE TRANSACTIONS
export const subscribeToTransactions = (
  userId: string,
  onUpdate: (transactions: TransactionData[]) => void,
  onError?: (error: Error) => void
) => {
  const transactionsRef = collection(
    db,
    "users",
    userId,
    "transactions"
  );

  const q = query(
    transactionsRef,
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const transactions = snapshot.docs.map((document) => {
        const data = document.data();

        return {
          ...data,
          id: document.id,
          date: data.date?.toDate() ?? new Date(),
        } as TransactionData;
      });

      onUpdate(transactions);
    },
    (error) => {
      onError?.(error);
    }
  );
};

// DELETE TRANSACTION
export const deleteTransactionDocument = async (
  userId: string,
  tid: string,
): Promise<void> => {
  try {
    const transactionRef = doc(
      db,
      "users",
      userId,
      "transactions",
      tid,
    );

    await deleteDoc(transactionRef);
  } catch (error) {
    console.error("Transaction deletion error:", error);
    throw error;
  }
};
