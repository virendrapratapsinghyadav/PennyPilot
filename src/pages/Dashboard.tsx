import Leftpanel from "@/components/Leftpanel"
import { Outlet } from "react-router-dom"


const Dashboard = () => {
  return (
    <div className="h-screen p-5 ">
      <div className=" flex h-full border rounded-lg overflow-hidden">
      <aside className="w-64 p-2 border-r">
        <Leftpanel />
      </aside>

      <main className="flex-1 p-5 overflow-y-scroll">
        <Outlet />
      </main>
    </div>
    </div>
  )
}

export default Dashboard
