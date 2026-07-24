import { Sun } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { logoutUser } from "@/firebase/auth"


const Leftpanel = () => {

    const navigate = useNavigate();
    const handleLogout = async()=>{
        await logoutUser();
        navigate("/login");
    };

    return (
        <div className="flex flex-col h-full">
            {/* Top section */}
            <div className="flex flex-col border rounded-lg flex-1">
            {/* Logo & Theme section */}
            <div className="flex items-center justify-between p-1 border rounded">
                <Link to={'.'}>
                <div className="flex items-center gap-1">
                    <div>
                        <img src="/Logo.png" width={'40px'} height={'20px'} className="rounded-md" />
                    </div>
                    <div><p className="font-bold">PennyPilot</p></div> 
                </div>
                </Link>
                <div className="px-2"> 
                    <Sun />
                </div>
            </div>

            {/* Page change section */}
            <div className="mt-10 flex flex-col gap-5 border p-1">
                <div className="border">
                    <Link to={'.'}>
                    <p>Dashboard</p>
                    </Link>
                </div>
                <div className="border">
                    <Link to={'analytics'}>
                    <p>Analytic Charts</p>
                    </Link>
                </div>
                <div className="border">
                    <Link to={'aiinsights'}>
                    <p>AI Insights</p>
                    </Link>
                </div>
                <div className="border">
                    <Link to={'help'}>
                    <p>Help</p>
                    </Link>
                </div>
            </div>
            </div>

            {/* Logout section */}
            <div className="">
                <Button className={'w-full'} onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default Leftpanel
