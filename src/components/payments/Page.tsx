import { useTransactionStore } from "@/store/transaction.store"
import { columns } from "./Columns"
import { DataTable } from "./Data-table"
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";


export default function DemoPage() {
  const user = useUserStore((state) => state.user);
  const transactions = useTransactionStore((state) => state.transactions);
  const subscribeTransactions = useTransactionStore(
    (state) => state.subscribeTransactions
  );


  useEffect(() => {
    if (!user) {
      useTransactionStore.getState().setTransactions([]);
      return;
    }

    const unsubscribe = subscribeTransactions(user.id);

    return () => unsubscribe();
  }, [user, subscribeTransactions]);


  return (
    <div className="">
      <div className="mb-4 container mx-auto px-3 py-4 sm:px-4 lg:px-6 lg:py-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Finance
            </p>

            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Transactions
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View and manage your financial activity.
            </p>
          </div>

          <div className="w-fit border-2 border-border bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-[3px_3px_0_var(--shadow-color)]">
            {transactions.length}{" "}
            {transactions.length === 1 ? "Transaction" : "Transactions"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="p-1 sm:p-2">
          <DataTable
            columns={columns}
            data={transactions}
          />
        </div>
      </div>
    </div>
  )
}
