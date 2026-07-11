import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

const TransactionDialog = () => {
  return (
    <div>
      <Dialog>
        <form>
            <DialogTrigger render={<Button className={'cursor-pointer'}>
              <Plus/>
              <p>Add Transactions</p>
            </Button>}></DialogTrigger>
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

export default TransactionDialog
