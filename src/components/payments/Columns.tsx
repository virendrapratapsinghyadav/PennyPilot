import type { ColumnDef } from "@tanstack/react-table";
import type { Timestamp } from "firebase/firestore";
import { Button } from "../ui/button";
import { ArrowUpDown, Trash2 } from "lucide-react";

export type Payment = {
  name: string;
  type: string;
  category: string;
  method: string;
  date: Date;
  amount: number;
};

export type FirestorePayment = Omit<Payment, "date"> & {
  date: Timestamp;
};

const sortButtonClass =
  "h-9 rounded-none px-2 text-xs font-bold uppercase tracking-wide text-[var(--muted-foreground)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]";

const SortIcon = () => (
  <ArrowUpDown
    className="ml-2 h-3.5 w-3.5"
    strokeWidth={2}
  />
);

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={sortButtonClass}
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Name
          <SortIcon />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="font-semibold text-[var(--foreground)]">
        {row.original.name}
      </span>
    ),
  },

  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={sortButtonClass}
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Type
          <SortIcon />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isIncome = row.original.type === "Income";

      return (
        <span
          className="inline-flex items-center border-2 px-2.5 py-1 text-xs font-bold uppercase tracking-wide"
          style={{
            borderColor: isIncome
              ? "var(--primary)"
              : "var(--border)",
            background: isIncome
              ? "var(--accent)"
              : "var(--muted)",
            color: isIncome
              ? "var(--accent-foreground)"
              : "var(--muted-foreground)",
          }}
        >
          {row.original.type}
        </span>
      );
    },
  },

  {
    accessorKey: "category",
    header: (
      <span className="text-xs font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
        Category
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-[var(--foreground)]">
        {row.original.category}
      </span>
    ),
  },

  {
    accessorKey: "method",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={sortButtonClass}
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Method
          <SortIcon />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="text-sm text-[var(--muted-foreground)]">
        {row.original.method}
      </span>
    ),
  },

  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={sortButtonClass}
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Date
          <SortIcon />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="text-sm text-[var(--muted-foreground)]">
        {row.original.date.toLocaleDateString()}
      </span>
    ),
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={sortButtonClass}
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Amount
          <SortIcon />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isIncome = row.original.type === "Income";

      return (
        <span
          className="font-bold tracking-tight"
          style={{
            color: isIncome
              ? "var(--primary)"
              : "var(--foreground)",
          }}
        >
          {isIncome ? "+" : "-"}
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(Math.abs(row.original.amount))}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: (
      <span className="text-xs font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
        Actions
      </span>
    ),
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 rounded-none border-2 border-transparent p-0 text-[var(--muted-foreground)] transition-all duration-150 hover:border-[var(--destructive)] hover:bg-[var(--destructive)] hover:text-[var(--destructive-foreground)]"
          onClick={() => {
            console.log("Deleted payment:", payment);
          }}
        >
          <Trash2
            className="h-4 w-4"
            strokeWidth={2}
          />
        </Button>
      );
    },
  },
];
