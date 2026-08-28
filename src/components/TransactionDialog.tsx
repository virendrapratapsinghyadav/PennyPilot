import {
  IndianRupee,
  Plus,
  CalendarDays,
  CreditCard,
  Tags,
  ArrowDownUp,
  FileText,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectLabel,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Payment } from "./payments/Columns";
import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useUserStore } from "@/store/store";
import { useTransactionStore } from "@/store/transactionStore";

const ACCENT = "#ccff00";

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
  };

  const methods = [
    { label: "Online", value: "Online" },
    { label: "Cash", value: "Cash" },
  ];

  const categories = [
    {
      label: "Income",
      value: "income",
      children: [
        { label: "Salary", value: "Salary", parent: "income" },
        { label: "Freelance", value: "Freelance", parent: "income" },
        { label: "Pension", value: "Pension", parent: "income" },
        { label: "other", value: "other", parent: "income" },
      ],
    },
    {
      label: "Food&Drinks",
      value: "food&drinks",
      children: [
        {
          label: "Groceries",
          value: "Groceries",
          parent: "food&drinks",
        },
        {
          label: "Eatingout",
          value: "Eatingout",
          parent: "food&drinks",
        },
        {
          label: "Beverages&Snacks",
          value: "Beverages&Snacks",
          parent: "food&drinks",
        },
        {
          label: "Other",
          value: "other",
          parent: "food&drinks",
        },
      ],
    },
    {
      label: "Shopping",
      value: "shopping",
      children: [
        {
          label: "Clothing",
          value: "Clothing",
          parent: "shopping",
        },
        {
          label: "Shoes",
          value: "Shoes",
          parent: "shopping",
        },
        {
          label: "Other",
          value: "other",
          parent: "shopping",
        },
      ],
    },
    {
      label: "Transportation",
      value: "transportation",
      children: [
        {
          label: "Fuel",
          value: "Fuel",
          parent: "transportation",
        },
        {
          label: "Public Transport",
          value: "Public Transport",
          parent: "transportation",
        },
        {
          label: "other",
          value: "other",
          parent: "transportation",
        },
      ],
    },
  ];

  const types = [
    { label: "Income", value: "Income" },
    { label: "Expense", value: "Expense" },
  ];

  const inputClass = `
    h-11
    rounded-none
    border-white/10
    bg-white/[0.035]
    text-white
    placeholder:text-zinc-600
    transition-all
    duration-200
    focus:border-[#ccff00]/60
    focus:ring-1
    focus:ring-[#ccff00]/25
  `;

  const selectClass = `
    h-11
    rounded-none
    border-white/10
    bg-white/[0.035]
    text-zinc-300
    transition-all
    duration-200
    hover:border-white/20
    focus:border-[#ccff00]/60
  `;

  return (
    <div>
      <Dialog>
        {/* Trigger */}
        <DialogTrigger
          render={
            <Button
              className="
                h-10
                cursor-pointer
                rounded-none
                border
                border-[#ccff00]/40
                bg-[#ccff00]
                px-5
                text-xs
                font-black
                uppercase
                tracking-widest
                text-black
                transition-all
                duration-200
                hover:bg-[#d6ff33]
                hover:shadow-[4px_4px_0_rgba(204,255,0,0.12)]
                active:translate-x-[2px]
                active:translate-y-[2px]
                active:shadow-none
              "
            >
              <Plus className="h-4 w-4" strokeWidth={3} />
              <span>Add Transaction</span>
            </Button>
          }
        />

        <DialogContent
          className="
            max-h-[90vh]
            max-w-xl
            overflow-y-auto
            rounded-none
            border
            border-white/10
            bg-[#080808]
            p-0
            text-white
            shadow-[8px_8px_0_rgba(204,255,0,0.06)]
            [&>button]:text-zinc-500
            [&>button]:hover:text-[#ccff00]
          "
        >
          {/* Top accent */}
          <div
            className="absolute left-0 top-0 h-px w-28"
            style={{ background: ACCENT }}
          />

          {/* Header */}
          <div className="border-b border-white/[0.07] px-7 py-6 sm:px-8">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    border
                    border-[#ccff00]/30
                    bg-[#ccff00]/[0.06]
                  "
                  style={{
                    clipPath:
                      "polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px)",
                  }}
                >
                  <FileText
                    className="h-5 w-5"
                    style={{ color: ACCENT }}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p
                    className="
                      mb-1
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.3em]
                    "
                    style={{ color: ACCENT }}
                  >
                    Financial Activity
                  </p>

                  <DialogTitle className="text-xl font-black uppercase tracking-tight text-white">
                    Add Transaction
                  </DialogTitle>
                </div>
              </div>
            </DialogHeader>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
              Record your income or expense and keep your PennyPilot
              financial activity up to date.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-7 py-7 sm:px-8">
              <FieldGroup className="gap-6">
                {/* Transaction name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel
                        className="
                          mb-2
                          text-[10px]
                          font-black
                          uppercase
                          tracking-widest
                          text-zinc-400
                        "
                      >
                        Transaction Name
                      </FieldLabel>

                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                        <Input
                          {...field}
                          placeholder="e.g. Grocery shopping"
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </Field>
                  )}
                />

                {/* Amount */}
                <Controller
                  name="amount"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel
                        className="
                          mb-2
                          text-[10px]
                          font-black
                          uppercase
                          tracking-widest
                          text-zinc-400
                        "
                      >
                        Amount
                      </FieldLabel>

                      <div className="relative">
                        <IndianRupee
                          size={16}
                          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#ccff00]"
                        />

                        <Input
                          className={`${inputClass} pl-9`}
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          placeholder="0.00"
                        />
                      </div>
                    </Field>
                  )}
                />

                {/* Date */}
                <Controller
                  name="date"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel
                        htmlFor="date-picker"
                        className="
                          mb-2
                          text-[10px]
                          font-black
                          uppercase
                          tracking-widest
                          text-zinc-400
                        "
                      >
                        Transaction Date
                      </FieldLabel>

                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              id="date-picker"
                              variant="outline"
                              className={`
                                ${inputClass}
                                flex
                                w-full
                                items-center
                                justify-start
                                gap-3
                                px-3
                                font-normal
                              `}
                            >
                              <CalendarDays className="h-4 w-4 text-zinc-600" />

                              <span
                                className={
                                  field.value
                                    ? "text-zinc-300"
                                    : "text-zinc-600"
                                }
                              >
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Pick a date"}
                              </span>
                            </Button>
                          }
                        />

                        <PopoverContent className="rounded-none border-white/10 bg-[#0a0a0a] p-2 text-white">
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

                {/* Method + Type */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Controller
                    name="method"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel
                          className="
                            mb-2
                            text-[10px]
                            font-black
                            uppercase
                            tracking-widest
                            text-zinc-400
                          "
                        >
                          Payment Method
                        </FieldLabel>

                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className={selectClass}>
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-zinc-600" />
                              <SelectValue placeholder="Method" />
                            </div>
                          </SelectTrigger>

                          <SelectContent className="rounded-none border-white/10 bg-[#0a0a0a] text-white">
                            <SelectGroup>
                              {methods.map((item) => (
                                <SelectItem
                                  key={item.value}
                                  value={item.value}
                                  className="focus:bg-[#ccff00]/10 focus:text-[#ccff00]"
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
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
                        <FieldLabel
                          className="
                            mb-2
                            text-[10px]
                            font-black
                            uppercase
                            tracking-widest
                            text-zinc-400
                          "
                        >
                          Transaction Type
                        </FieldLabel>

                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className={selectClass}>
                            <div className="flex items-center gap-2">
                              <ArrowDownUp className="h-4 w-4 text-zinc-600" />
                              <SelectValue placeholder="Type" />
                            </div>
                          </SelectTrigger>

                          <SelectContent className="rounded-none border-white/10 bg-[#0a0a0a] text-white">
                            <SelectGroup>
                              {types.map((item) => (
                                <SelectItem
                                  key={item.value}
                                  value={item.value}
                                  className="focus:bg-[#ccff00]/10 focus:text-[#ccff00]"
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </div>

                {/* Category */}
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel
                        className="
                          mb-2
                          text-[10px]
                          font-black
                          uppercase
                          tracking-widest
                          text-zinc-400
                        "
                      >
                        Category
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className={selectClass}>
                          <div className="flex items-center gap-2">
                            <Tags className="h-4 w-4 text-zinc-600" />
                            <SelectValue placeholder="Select category" />
                          </div>
                        </SelectTrigger>

                        <SelectContent className="max-h-72 rounded-none border-white/10 bg-[#0a0a0a] text-white">
                          {categories.map((category) => (
                            <SelectGroup key={category.value}>
                              <SelectLabel className="px-2 py-2 text-[9px] font-black uppercase tracking-widest text-[#ccff00]/70">
                                {category.label}
                              </SelectLabel>

                              {category.children?.map((child) => (
                                <SelectItem
                                  key={`${category.value}-${child.value}-${child.label}`}
                                  value={child.value}
                                  className="focus:bg-[#ccff00]/10 focus:text-[#ccff00]"
                                >
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
              </FieldGroup>
            </div>

            {/* Footer */}
            <DialogFooter className="border-t border-white/[0.07] bg-white/[0.015] px-7 py-5 sm:px-8">
              <DialogClose
                render={
                  <Button
                    type="button"
                    className="
                      h-11
                      rounded-none
                      border
                      border-white/10
                      bg-transparent
                      px-6
                      text-xs
                      font-black
                      uppercase
                      tracking-widest
                      text-zinc-500
                      transition-all
                      hover:border-white/20
                      hover:bg-white/[0.04]
                      hover:text-white
                    "
                  >
                    Cancel
                  </Button>
                }
              />

              <Button
                type="submit"
                className="
                  h-11
                  rounded-none
                  border
                  border-[#ccff00]
                  bg-[#ccff00]
                  px-7
                  text-xs
                  font-black
                  uppercase
                  tracking-widest
                  text-black
                  transition-all
                  hover:bg-[#d6ff33]
                  hover:shadow-[4px_4px_0_rgba(204,255,0,0.15)]
                  active:translate-x-[2px]
                  active:translate-y-[2px]
                  active:shadow-none
                "
              >
                Save Transaction
              </Button>
            </DialogFooter>
          </form>

          {/* Bottom accents */}
          <div
            className="absolute bottom-0 right-0 h-px w-16"
            style={{ background: ACCENT }}
          />

          <div
            className="absolute bottom-0 right-0 h-16 w-px"
            style={{ background: ACCENT }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionDialog;
