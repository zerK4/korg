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
import { useFinancial } from "@/store/useFinancial";
import { useEffect, useState } from "react";

export function FilterCalendar() {
  const [currentDate, setCurrentDate] = useState<string | undefined>();
  const { filterDate } = useFinancial();

  useEffect(() => {
    setCurrentDate(filterDate?.toLocaleDateString());
  }, [filterDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-fit text-left font-normal flex items-center gap-4 h-10 min-w-10 p-0 md:px-3",
            !filterDate && "text-muted-foreground"
          )}
        >
          <span className='hidden md:flex'>
            {filterDate ? currentDate : "Pick a date"}
          </span>
          <CalendarIcon className='opacity-50' size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-2 dark:cardGradient' align='end'>
        <Button
          onClick={() => useFinancial.setState({ filterDate: null })}
          className='w-full'
        >
          Show all
        </Button>
        <Calendar
          mode='single'
          selected={filterDate || new Date()}
          onSelect={(e) => useFinancial.setState({ filterDate: e })}
          disabled={(date) => date > new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
