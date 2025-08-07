import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const ModalUsers = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" >Create User</Button>
      </DialogTrigger>
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ModalUsers;
