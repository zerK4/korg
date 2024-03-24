import { BarChart, Coins, Grid, Home, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export function Sidebar() {
  return (
    <div className='fixed top-0 left-0 h-[100dvh] w-20 border-r flex flex-col justify-center'>
      <div>asd</div>
      <Separator className='my-10' />
      <div className='flex flex-col gap-4 items-center w-full h-full'>
        {navMenu.map((item, i) => (
          <Tooltip key={i} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link key={i} href={item.href}>
                <Button className='h-14 w-14' variant={"ghost"} size={"icon"}>
                  <span>{item.icon}</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side='right'
              className='h-14 flex items-center gradiendBg text-foreground ml-4'
            >
              <span className='text-lg'>{item.name}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className='flex justify-center mb-2'>
        <Button className='h-14 w-14' variant={"ghost"} size={"icon"}>
          <LogOut />
        </Button>
      </div>
    </div>
  );
}

export const navMenu = [
  {
    name: "Dashboard",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    name: "Chelutieli",
    icon: <Coins size={20} />,
    href: "/expenses",
  },
  {
    name: "Venituri",
    icon: <BarChart size={20} />,
    href: "/incomes",
  },
  {
    name: "Categorii",
    icon: <Grid size={20} />,
    href: "/categories",
  },
];
