import Leftpanel from "@/components/Leftpanel"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Hamburger } from "lucide-react"

const Dashboard = () => {
  const [present, setPresent] = useState<boolean>(true);

  return (
    <div className="h-screen p-5 ">
      <div className=" flex h-full border overflow-hidden">
      <aside className="w-64 p-2 border-r">
        {
          present? (<Leftpanel />) : (<Hamburger />)
        }
      </aside>

      <main className="flex-1 p-5 overflow-y-scroll">
        <Outlet />
      </main>
    </div>
    <div>
    </div>
    </div>
  )
}

export default Dashboard
