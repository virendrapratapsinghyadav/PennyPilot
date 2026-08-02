import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"
import TransactionDialog from "@/components/TransactionDialog"
import DashboardCards from "@/components/DashboardCards"
import RadarCharts from "@/charts/RadarCharts"
import { useUserStore } from "@/store/store";
import DemoPage from "@/components/payments/Page"



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
              <DemoPage/>
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
