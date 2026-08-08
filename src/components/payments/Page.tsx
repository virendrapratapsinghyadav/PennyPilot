import { useTransactionStore } from "@/store/transactionStore"
import { columns } from "./Columns"
import { DataTable } from "./Data-table"
import { useUserStore } from "@/store/store";
import { useEffect } from "react";
import { db } from "@/firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import type { Payment, FirestorePayment } from "./Columns";


export default function DemoPage() {
  const user = useUserStore((state) => state.user);
  const transactions = useTransactionStore((state) => state.transactions);
  const setTransactions = useTransactionStore((state) => state.setTransactions);


  useEffect(() => {

    if (!user) return;

    const q = query(
      collection(db, "users", user.id, "transactions"),
      orderBy("createdAt", "desc")
    );


    const unsubscribe = onSnapshot(q, (snapshot) => {

      const data: Payment[] = snapshot.docs.map((doc) => {

        const transaction = doc.data() as FirestorePayment;

        return {
          ...transaction,
          date: transaction.date?.toDate() ?? new Date(),
        };

      });

      setTransactions(data);

    });

    return () => unsubscribe();

  }, [user, setTransactions]);


  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={transactions}
      />
    </div>
  )
}