import { IndianRupee, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Field, FieldGroup, FieldLabel } from "./ui/field"
import { Controller, useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import { Select, SelectLabel, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { Payment } from "./payments/Columns";
import { db } from "../firebase/config"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useUserStore } from "@/store/store";
import { useTransactionStore } from "@/store/transactionStore"

const TransactionDialog = () => {

  const form = useForm<Payment>();
  const user = useUserStore((state) => state.user);
  const addTransaction = useTransactionStore(
    (state) => state.addTransaction
  );



  const onSubmit = async (data: Payment) => {
    try {
      if (!user) {
        console.error("User not logged in");
        return;
      }
      await addDoc(
        collection(db, "users", user.id, "transactions"),
        {
          ...data,
          createdAt: serverTimestamp(),
        }
      );
      addTransaction(data);
      form.reset();
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  }


  const methods = [
    { label: "Online", value: "Online" },
    { label: "Cash", value: "Cash" },
  ]

  const categories = [
    {
      label: "Income",
      value: "income",
      children: [
        { label: "Salary", value: "Salary", parent: "income" },
        { label: "Freelance", value: "Freelance", parent: "income" },
        { label: "Pension", value: "Pension", parent: "income" },
        { label: "other", value: "other", parent: "income" },
      ]
    },
    {
      label: "Food&Drinks",
      value: "food&drinks",
      children: [
        { label: "Groceries", value: "Groceries", parent: "food&drinks" },
        { label: "Eatingout", value: "Eatingout", parent: "food&drinks" },
        { label: "Beverages&Snacks", value: "Beverages&Snacks", parent: "food&drinks" },
        { label: "Other", value: "other", parent: "food&drinks" },
      ]
    },
    {
      label: "Shopping",
      value: "shopping",
      children: [
        { label: "Clothing", value: "Clothing", parent: "shopping" },
        { label: "Shoes", value: "Shoes", parent: "shopping" },
        { label: "Other", value: "other", parent: "shopping" },
      ]
    },
    {
      label: "Transportation",
      value: "transportation",
      children: [
        { label: "Fuel", value: "Fuel", parent: "transportation" },
        { label: "Public Transport", value: "Public Transport", parent: "transportation" },
        { label: "other", value: "other", parent: "transportation" },
      ]
    },
  ]

  const types = [
    { label: "Income", value: "Income" },
    { label: "Expense", value: "Expense" },
  ]


  return (
    <div>
      <Dialog>
        <DialogTrigger render={<Button className={'cursor-pointer'}>
          <Plus />
          <p>Add Transactions</p>
        </Button>}></DialogTrigger>
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter name"
                    />
                  </Field>
                )}
              />
              <Controller
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <Field className="relative">
                    <FieldLabel>Amount</FieldLabel>
                    <IndianRupee size={16} className="absolute top-9 right-40 pointer-events-none" />
                    <Input
                      className="pl-8"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="Enter amount"
                    />
                  </Field>
                )}
              />
              <Controller
                name="date"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="date-picker">Date</FieldLabel>
                    <Popover>
                      <PopoverTrigger render={<Button id="date-picker" variant={'outline'}>{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button>}></PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          defaultMonth={field.value}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>
                )}
              />
              <Controller
                name="method"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Method</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {
                            methods.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectGroup key={category.value}>
                            <SelectLabel>{category.label}</SelectLabel>

                            {category.children?.map((child) => (
                              <SelectItem key={child.value} value={child.value}>
                                {child.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Controller
                name="type"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Type</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {
                            types.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button>Cancel</Button>}></DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TransactionDialog
