"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import { usePathname } from "next/navigation";
import { navMenu } from "@/lib/navigation";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className='fixed top-0 left-0 h-[100dvh] w-20 border-r md:flex flex-col justify-center z-50 hidden'>
      <div>asd</div>
      <Separator className='my-10' />
      <div className='flex flex-col gap-4 items-center w-full h-full'>
        {navMenu.map((item, i) => (
          <Tooltip key={i} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link key={i} href={item.href}>
                <Button
                  className={`h-14 w-14 relative ${
                    pathname === item.href
                      ? " after:h-full after:absolute after:-right-3 after:top-0 after:w-0.5 after:bg-accent after:rounded-full after:ease-in-out after:duration-300"
                      : ""
                  }`}
                  variant={"ghost"}
                  size={"icon"}
                >
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
