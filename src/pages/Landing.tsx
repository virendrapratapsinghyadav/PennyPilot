import DashboardCards from "@/components/DashboardCards"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const Landing = () => {
  return (
    <div>
      <div className="">
        <div className='bg-[#10B981]'>
          Landing Page PennyPilot - Take control of every rupee with AI-powered financial insights.
        </div>
        <Link to={'/signup'}>
          <Button>
            SignUp
          </Button>
        </Link>
        <Link to={'/login'}>
          <Button>
            Login
          </Button>
        </Link>
        <Link to={'/dashboard'}>
          <Button>
            Dashboard
          </Button>
        </Link>
        <DashboardCards />
      </div>
    </div>
  )
}

export default Landing
