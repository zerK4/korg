import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFinancial } from "@/store/useFinancial";
import { months } from "@/lib/constants";

function FilterSelectMonth() {
  const { filterMonth } = useFinancial();

  return (
    <div className='flex items-center gap-2'>
      <span className='hidden md:flex whitespace-nowrap'>Select month</span>
      <Select
        onValueChange={(value) =>
          useFinancial.setState({ filterMonth: Number(value) })
        }
      >
        <SelectTrigger className='min-w-10 w-fit h-10'>
          <SelectValue placeholder={months[filterMonth - 1].name} />
        </SelectTrigger>
        <SelectContent align='end'>
          {months.map(({ value, name }) => (
            <SelectItem key={value} value={String(value)}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterSelectMonth;
