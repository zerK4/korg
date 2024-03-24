"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDown, ArrowUp, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import anime from "animejs";

function TotalsCard({
  data,
}: {
  data: {
    thisMonthIncomeSum: string;
    thisMonthExpenseSum: string;
    percentageIncome: { change: number; direction: string } | undefined;
    percentageExpense: { change: number; direction: string } | undefined;
  };
}) {
  const {
    percentageExpense,
    percentageIncome,
    thisMonthExpenseSum,
    thisMonthIncomeSum,
  } = data;

  const cardRef = useRef(null);

  useEffect(() => {
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 500,
      easing: "linear",
    });
  }, []);

  return (
    <Card
      ref={cardRef}
      className='border group/sharedCard rounded-xl gradiendBg ease-in-out duration-300 flex flex-col relative w-full md:w-1/2 scale-0 opacity-0 translate-y-40'
    >
      <CardHeader className=''>
        <CardTitle className='text-3xl flex items-center justify-between'>
          <span className='text-2xl font-bold'>Overview</span>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Info size={16} />
            </TooltipTrigger>
            <TooltipContent className='text-sm max-w-96 text-foreground/80 p-4 rounded-xl'>
              Acesta este overwiew-ul lunii in curs, dupa ce ai cheltuieli si
              venituri pe mai multe luni o sa ai si un indicator care iti va
              arata cum evoluezi, daca te duci in sus sau mai in jos.
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex items-center justify-between flex-wrap gap-4'>
        <div className='flex flex-col gap-1 flex-1 basis-40 whitespace-nowrap justify-center'>
          <div className='flex items-center gap-2'>
            <span>Incasari luna asta</span>
            {percentageIncome && percentageIncome.direction !== "same" && (
              <span className='text-xs flex items-center'>
                {percentageIncome?.direction === "up" ? (
                  <ArrowUp size={12} className='text-lime-400' />
                ) : (
                  <ArrowDown size={12} className='text-red-400' />
                )}
                {percentageIncome?.change} %
              </span>
            )}
          </div>
          <span className='text-2xl font-semibold '>
            <span>{thisMonthIncomeSum}</span>
          </span>
        </div>
        <div className='flex flex-col gap-1  flex-1 basis-40 whitespace-nowrap justify-center'>
          <div className='flex items-center gap-2'>
            <span>Cheltuieli luna asta</span>
            {percentageExpense && percentageExpense.direction !== "same" && (
              <span className='text-xs flex items-center'>
                {percentageExpense?.direction === "up" ? (
                  <ArrowUp size={12} className='text-lime-400' />
                ) : (
                  <ArrowDown size={12} className='text-red-400' />
                )}
                {percentageExpense?.change} %
              </span>
            )}
          </div>
          <span className='text-2xl font-semibold'>{thisMonthExpenseSum}</span>
        </div>
        <div className='flex flex-col gap-1  flex-1 basis-40 whitespace-nowrap justify-center'>
          <span>Cheltuieli prevazute luna asta</span>
          <span className='text-2xl font-semibold'>{thisMonthExpenseSum}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default TotalsCard;
