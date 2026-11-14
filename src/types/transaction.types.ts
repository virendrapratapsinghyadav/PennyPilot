export type Payment = {
  name: string;
  type: string;
  category: string;
  method: string;
  date: Date;
  amount: number;
};

export type TransactionData = Payment & {
  id: string;
};