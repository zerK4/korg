"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "./ui/calendar";
import { ExpenseType, IncomeType } from "@/db/schema";
import { DayProps } from "react-day-picker";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import anime from "animejs";
import { cn } from "@/lib/utils";

function AnalyticsCalendar({
  data,
  noBorder = false,
}: {
  data: {
    currentExpenses: ExpenseType[] | null;
    currentIncomes: IncomeType[] | null;
  };
  noBorder?: boolean;
}) {
  const sharedRef = useRef(null);
  const [currentExpenses, setCurrentExpenses] = useState<ExpenseType[] | null>(
    []
  );
  const [currentIncomes, setCurrentIncomes] = useState<IncomeType[] | null>([]);

  useEffect(() => {
    setCurrentExpenses(data.currentExpenses);
    setCurrentIncomes(data.currentIncomes);
  }, [data]);

  useEffect(() => {
    anime({
      targets: sharedRef.current,
      scale: [0, 1],
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      easing: "easeInOutExpo",
    });
  }, []);

  const renderDay = (day: DayProps) => {
    const isCurrentMonth = day?.date?.getMonth() === new Date().getMonth();
    const buttonClass = isCurrentMonth
      ? "opacity-100"
      : "opacity-30 pointer-events-none";

    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={`h-12 w-12 relative grid place-content-center ease-in-out duration-300 cursor-pointer rounded-xl hover:bg-accent/80 hover:border ${buttonClass}`}
          >
            {day?.date?.getDate()}
            {currentExpenses && (
              <RenderCoolDot
                data={currentExpenses}
                color={"bg-red-500"}
                day={day}
              />
            )}
            {currentIncomes && (
              <RenderCoolDot
                data={currentIncomes}
                color={"bg-lime-500"}
                day={day}
              />
            )}
          </Button>
        </TooltipTrigger>
      </Tooltip>
    );
  };
  return (
    <div
      ref={sharedRef}
      className={cn("flex flex-1 basis-96 justify-center rounded-xl h-fit", {
        "border": true,
        "border-none": noBorder,
      })}
    >
      <Calendar components={{ Day: renderDay }} />
    </div>
  );
}

export default AnalyticsCalendar;

const RenderCoolDot = ({
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
        if (day.date.toLocaleDateString() === x.date) {
          return (
            <span
              key={i}
              className='absolute h-3 bottom-0 left-0 grid place-content-center w-full'
            >
              <span className={`h-2 w-2 ${color} rounded-full`} />
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
