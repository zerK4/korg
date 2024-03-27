"use client";

import { ExpenseType, IncomeType } from "@/db/schema";
import { DayProps } from "react-day-picker";
import { TooltipContent } from "../ui/tooltip";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const RenderCoolDot = ({
  data,
  color,
  day,
}: {
  data: IncomeType[] | ExpenseType[] | undefined;
  color: string;
  day: DayProps;
}) => {
  if (!data) return null;

  return (
    <span>
      {data?.map((x, i) => {
        if (
          day.date.toLocaleDateString() ===
          new Date(x.date as number).toLocaleDateString()
        ) {
          return (
            <span
              key={i}
              className='absolute h-3 bottom-0 left-0 grid place-content-center w-full'
            >
              <DotEl amount={x.amount} color={color} />
              <TooltipContent className='p-4 text-foreground/80 rounded-xl'>
                {x.name}
              </TooltipContent>
            </span>
          );
        }
      })}
    </span>
  );
};

const DotEl = ({ amount, color }: { amount: number; color: string }) => {
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    anime({
      targets: dotRef.current,
      width: [0, Math.floor(Math.min(Math.max(amount / 100, 4), 25) + 3)],
      duration: 1000,
      easing: "easeInOutElastic(1, 0.5)",
      delay: 1500,
    });
  }, [amount]);
  return (
    <span
      ref={dotRef}
      style={{
        height: 4,
      }}
      className={`${color} rounded-full`}
    />
  );
};
