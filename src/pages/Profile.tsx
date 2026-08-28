import ProfileUpdateDialog from "@/components/ProfileUpdateDialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/store/store";

const Profile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-background px-4 py-10">
      <Card className="brutal-card w-full max-w-xl rounded-none">

        {/* Header */}
        <CardHeader className="border-b-2 border-border pb-6">
          <div className="flex flex-col items-center gap-4">

            {/* Profile Image */}
            <div className="relative">
              <img
                src={user?.profileURL || "/Logo.png"}
                alt="Profile"
                className="h-28 w-28 rounded-full border-2 border-border object-cover shadow-[4px_4px_0_var(--shadow-color)]"
              />

              <div className="absolute -bottom-2 -right-2 border-2 border-border bg-primary px-2 py-1 text-xs font-black">
                USER
              </div>
            </div>

            <div className="text-center">
              <CardTitle className="text-3xl font-black tracking-tight">
                {user?.name || "Your Profile"}
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage your account information
              </p>
            </div>

          </div>
        </CardHeader>

        {/* User Information */}
        <CardContent className="space-y-4 pt-6">

          {/* Name */}
          <div className="border-2 border-border bg-card">
            <div className="border-b-2 border-border bg-secondary px-4 py-2">
              <span className="text-xs font-black uppercase tracking-wider">
                Name
              </span>
            </div>

            <div className="px-4 py-3">
              <p className="font-bold">
                {user?.name || "Not available"}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="border-2 border-border bg-card">
            <div className="border-b-2 border-border bg-secondary px-4 py-2">
              <span className="text-xs font-black uppercase tracking-wider">
                Email
              </span>
            </div>

            <div className="px-4 py-3">
              <p className="break-all font-bold">
                {user?.email || "Not available"}
              </p>
            </div>
          </div>

        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-end border-t-2 border-border pt-6">
          <div className="brutal-button bg-primary">
            <ProfileUpdateDialog />
          </div>
        </CardFooter>

      </Card>
    </div>
  );
};

export default Profile;