import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { BellDot, Settings } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";

function Topbar() {
  return (
    <div className='sticky top-0 h-[4.05rem] flex items-center justify-between border-b w-full px-2'>
      <div className='text-sm text-zinc-500'>
        Apasa cmd + k pentru comezi rapide.
      </div>
      <div className='flex items-center gap-4'>
        <NotificationDropdown />
        <UserDropdown />
      </div>
    </div>
  );
}

export default Topbar;

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='rounded-full h-12 w-12 bg-muted text-foreground'
          size={"icon"}
        >
          SP
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='mt-2 p-2 w-[12rem]'>
        <DropdownMenuGroup className='h-10 flex items-center'>
          <span className='p-2'>Salut, Sebastian</span>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='p-2 flex items-center gap-2 group/menuItem'>
          <span>
            <PersonIcon className='group-hover/menuItem:animate-bounce' />
          </span>
          <span>Profil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='p-2 flex items-center gap-2 group/menuItem'>
          <span>
            <Settings size={15} className='group-hover/menuItem:animate-spin' />
          </span>
          <span>Setari</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='rounded-full h-8 w-8 relative' size={"icon"}>
          <BellDot size={16} />
          <span className='absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-foreground'>
            0
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='mt-2 p-2 w-[12rem]'>
        {/* <DropdownMenuItem className='p-2'>item</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
