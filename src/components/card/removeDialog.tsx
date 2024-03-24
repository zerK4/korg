import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

function RemoveDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className='flex items-center gap-2 px-2 w-full justify-start hover:bg-red-500 hover:text-foreground'
        >
          <span>
            <Trash size={14} />
          </span>
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p>Esti sigur ca vrei sa stergi acest rand?</p>
        <Separator />
        <DialogFooter>
          <Button variant={"destructive"}>Sterge</Button>
          <DialogClose>
            <Button variant={"ghost"}>Anuleaza</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RemoveDialog;
