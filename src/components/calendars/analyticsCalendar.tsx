"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "../ui/calendar";
import { ExpenseType, IncomeType } from "@/db/schema";
import { DayProps } from "react-day-picker";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import anime from "animejs";
import { cn } from "@/lib/utils";
import { RenderCoolDot } from "./coolDot";

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
    const buttonClass = isCurrentMonth ? "text-opacity-100" : "text-zinc-500";

    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={`h-12 w-12 relative flex ease-in-out duration-300 cursor-pointer rounded-xl hover:bg-accent/80 hover:border ${buttonClass}`}
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
      className={cn(
        "flex flex-1 basis-96 calendarGradient justify-center rounded-xl h-fit opacity-0 translate-y-40",
        {
          "border": true,
          "border-none": noBorder,
        }
      )}
    >
      <Calendar components={{ Day: renderDay }} />
    </div>
  );
}

export default AnalyticsCalendar;
