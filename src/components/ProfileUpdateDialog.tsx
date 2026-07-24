import { Controller, useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useUserStore } from "@/store/store";


const ProfileUpdateDialog = () => {

  const user = useUserStore((state)=>state.user);

  const form = useForm({
    defaultValues: {
    name: user?.name ||"",
    email: "",
    oldpassword: "",
    newpassword: "",
  },
  });

  const onSubmit = () => {
    try {
      console.log("Profile updated!");
      form.reset();
    } catch (error) {
      console.log("Update Failed: ", error);
    }
  }

  return (
    <div className={'w-full'}>
      <Dialog>
        <DialogTrigger render={<Button className={'w-full'}>Update Profile</Button>}></DialogTrigger>
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    {...field}
                    placeholder={user?.name}
                  />
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    disabled
                    placeholder={user?.email}
                  />
                </Field>
              )}
            />
            <Controller
              name="oldpassword"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Old Password</FieldLabel>
                  <Input
                    {...field}
                    placeholder="if old matches with DB password then only change password"
                  />
                </Field>
              )}
            />
            <Controller
              name="newpassword"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>New Password</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter password"
                  />
                </Field>
              )}
            />
            <DialogFooter>
              <DialogClose render={<Button>Cancel</Button>}></DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProfileUpdateDialog
