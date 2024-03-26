import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormControl } from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

export function FormCalendar({ field }: { field: any }) {
  const [date, setDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date(field.value));
  }, [field]);

  const handleDateSelect = (e: any) => {
    field.onChange(e.getTime());
    setSelectedDate(e);
    setDate(e);
  };

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <FormControl className='w-full'>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              <span>{date?.toLocaleDateString()}</span>
            ) : (
              <span>Selecteaza o data</span>
            )}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={selectedDate as Date}
          onSelect={handleDateSelect}
          disabled={(date) => date > new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
