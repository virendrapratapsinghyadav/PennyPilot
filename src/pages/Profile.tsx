import ProfileUpdateDialog from "@/components/ProfileUpdateDialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


const Profile = () => {
  return (
    <div className="flex justify-center">
      <Card className="w-full">
        <CardHeader className="flex justify-center">
          <CardTitle>
            <img src="/Logo.png" width={'100px'} height={'100px'} className="rounded-full"/>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <span>Name : </span><span>Virendra Pratap Singh yadav</span>
          </div>
          <div>
            <span>Email : </span><span>virendrapratapsinghyadav2@gmail.com</span>
          </div>
        </CardContent>
        <CardFooter>
          <ProfileUpdateDialog/>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Profile
