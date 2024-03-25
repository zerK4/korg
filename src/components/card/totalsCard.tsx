"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDown, ArrowUp, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import anime from "animejs";

function TotalsCard({
  data: {
    totalBudgetTypes,
    thisMonthIncomeSum,
    thisMonthExpenseSum,
    percentageIncome,
    percentageExpense,
  },
}: {
  data: {
    totalBudgetTypes: {
      name: string;
      amount: number;
    }[];
    thisMonthIncomeSum: string;
    thisMonthExpenseSum: string;
    percentageIncome: { change: number; direction: string } | undefined;
    percentageExpense: { change: number; direction: string } | undefined;
  };
}) {
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
      className='border group/sharedCard rounded-xl flex-1 basis-[70vw] coloredGradient ease-in-out duration-300 flex flex-col relative w-full md:w-1/2 scale-0 opacity-0 translate-y-40'
    >
      <CardHeader className=''>
        <CardTitle className='text-3xl flex items-center justify-between'>
          <div className='flex gap-2 flex-col'>
            <span className='text-2xl font-bold'>Overview</span>
            <div className='flex flex-wrap gap-2'>
              {totalBudgetTypes.length > 0 &&
                totalBudgetTypes.map((item, i) => (
                  <div key={i} className='text-base w-[10rem]'>
                    <span>{item.name}: </span>
                    <span>
                      {item.amount.toLocaleString("ro-RO", {
                        style: "currency",
                        currency: "RON",
                      })}
                    </span>
                  </div>
                ))}
            </div>
          </div>
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
        <div className='flex flex-col gap-1  flex-1 basis-40 whitespace-nowrap justify-center'>
          <span>Economii</span>
          <span className='text-2xl font-semibold'>{thisMonthExpenseSum}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default TotalsCard;
