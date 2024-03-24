"use client";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function FilterCalendar() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-fit text-left font-normal flex items-center gap-4 h-10 min-w-10 p-0 md:px-3"
            //   !field.value && "text-muted-foreground"
          )}
        >
          <span className='hidden md:flex'>Pick a date</span>
          <CalendarIcon className='opacity-50' size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 dark:cardGradient' align='end'>
        <Calendar
          mode='single'
          //   selected={field.value}
          //   onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
