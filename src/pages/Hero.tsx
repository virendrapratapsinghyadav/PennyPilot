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
import TransactionDialog from "@/components/TransactionDialog"
import DashboardCards from "@/components/DashboardCards"
import RadarCharts from "@/charts/RadarCharts"
import { useUserStore } from "@/store/store";


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
  const user = useUserStore((state)=>state.user);
  return (
    <div className="h-screen bg-red-200 rounded-xl">
      {/* Top Section */}
      <div className="flex gap-10">
        <div className="flex-1 relative">
          <Search className="absolute  left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input type="text" className="pl-8" placeholder="Search anything" />
        </div>
        <Link to={'profile'}>
        <div className="flex items-center justify-center border px-2">
          <div className="px-1">
            <img src="/Logo.png" width={'15px'} height={'15px'} className="rounded" />
          </div>
          <div>
            {user?.name}
          </div>
        </div>
        </Link>
      </div>


      {/* Bottom Section */}
      <div className="h-full">
        {/* Bottom top section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Transactions</h1>
            <p className="text-slate-500 text-sm">
              View and manage all your income and expenses in one place
            </p>
          </div>
          <div>
            <TransactionDialog/>
          </div>
        </div>

        {/* Bottom bottom section */}
        <div className="flex border gap-5 justify-between">
          {/* Left section */}
          <div className="flex flex-col flex-1 border">
            {/* Left top section */}
            <div className="flex gap-10 p-1">
              <DashboardCards/>
              <DashboardCards/>
              <DashboardCards/>
            </div>

            {/* Left bottom section */}
            <div>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Invoice</TableHead>
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
          </div>B

          {/* Right Section */}
          <div className="w-125">
            {/* Right top Section */}
            <div>
              <RadarCharts/>
            </div>

            {/* Right bottom Section */}
            <div>
              <RadarCharts/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
