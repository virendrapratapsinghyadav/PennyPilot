import type { Payment } from "@/components/payments/Columns"


export const getTotalByType = (
    transactions: Payment[],
    type: string
) => {
    return transactions
     .filter((transaction)=> transaction.type === type)
     .reduce((total, transaction) => total + transaction.amount, 0)
}



export const getTransactionsInRange = (
    transactions: Payment[],
    start: Date,
    end: Date,
) => {
    return transactions.filter((transaction) => {
        return (
            transaction.date >= start &&
            transaction.date <= end
        )
    })
}