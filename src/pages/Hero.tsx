import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"


const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]



const Hero = () => {
  return (
    <div className="">
      {/* Top Section */}
      <div className="flex gap-10">
        <div className="flex-1 relative">
          <Search className="absolute  left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input type="text" className="pl-8" placeholder="Search anything" />
        </div>
        <Link to={'/dashboard/profile'}>
        <div className="flex items-center justify-center border px-2">
          <div className="px-1">
            <img src="/Logo.png" width={'15px'} height={'15px'} className="rounded" />
          </div>
          <div>
            Virendra
          </div>
        </div>
        </Link>
      </div>


      {/* Bottom Section */}
      <div>
        {/* Bottom top section */}
        <div className="flex items-center justify-between">
          <div>
            <h1>Transactions</h1>
            <p>View and manage all your income and expenses in one place</p>
          </div>
          <div>
            <Button size={'lg'}>Add Transactions</Button>
          </div>
        </div>

        {/* Bottom bottom section */}
        <div className="flex border gap-5 justify-between">
          {/* Left section */}
          <div className="flex flex-col flex-1 border">
            {/* Left top section */}
            <div className="flex justify-between">
              <div>Total transactions Card</div>
              <div>Incomes Card</div>
              <div>Expenses Card</div>
            </div>

            {/* Left bottom section */}
            <div>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 3).map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">{invoice.invoice}</TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>

          {/* Right Section */}
          <div>
            {/* Right top Section */}
            <div>
              circle Chart
            </div>

            {/* Right bottom Section */}
            <div>
              Anything else
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
