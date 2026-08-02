import type { ColumnDef } from '@tanstack/react-table'
import type { Timestamp } from 'firebase/firestore';


export type Payment = {
    name: string,
    type: string,
    category: string,
    method: string,
    date: Date,
    amount: number,
}

export type FirestorePayment = Omit<Payment, "date"> & {
    date: Timestamp;
};


export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "name", //defines where data comes from, it's a connection between column and object property
        header: "Name",      //It just defines the column header Name
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "method",
        header: "Method",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            return row.original.date.toLocaleDateString()
        },
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            return new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(row.original.amount)
        },
    }
]