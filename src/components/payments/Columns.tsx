import type { ColumnDef } from '@tanstack/react-table'
import type { Timestamp } from 'firebase/firestore';
import { Button } from '../ui/button';
import { ArrowUpDown, Trash2 } from 'lucide-react';


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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "method",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Method
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            return row.original.date.toLocaleDateString()
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            return new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(row.original.amount)
        },
    },
    {
  id: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const payment = row.original

    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          console.log("Deleted payment:", payment)
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    )
  },
},
    
]