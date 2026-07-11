import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

const ProfileUpdateDialog = () => {
  return (
    <div className={'w-full'}>
      <Dialog>
        <form>
            <DialogTrigger render={<Button className={'w-full'}>Update Profile</Button>}></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose render={<Button>Cancel</Button>}></DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}

export default ProfileUpdateDialog
