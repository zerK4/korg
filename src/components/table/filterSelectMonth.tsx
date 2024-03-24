import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function FilterSelectMonth() {
  return (
    <div className='flex items-center gap-2'>
      <span className='hidden md:flex whitespace-nowrap'>Selecteaza luna</span>
      <Select>
        <SelectTrigger className='min-w-10 w-fit h-10'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent align='end'>
          {Array.from({ length: 12 }, (_, i) => {
            return i + 1;
          }).map((month) => (
            <SelectItem key={month} value={String(month)}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterSelectMonth;
