import { Button } from "@/components/ui/button"
import Login from "./Login"
import Signup from "./Signup"
import { Link } from "react-router-dom"


const Landing = () => {
  return (
    <div>
      <div>
        <div className='bg-[#10B981]'>
          Landing Page PennyPilot - Take control of every rupee with AI-powered financial insights.
        </div>
        <Link to={'/signup'}>
          <Button>
            <Signup />
          </Button>
        </Link>
        <Link to={'/login'}>
          <Button>
            <Login />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Landing
