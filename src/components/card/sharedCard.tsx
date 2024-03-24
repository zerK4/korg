"use client";

import { calculatePercentageChange } from "@/lib/utils";
import anime from "animejs";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader } from "../ui/card";
import { ExpenseType, IncomeType } from "@/db/schema";

function SharedCard({
  data,
  name = "SharedCard",
  total = "0",
}: {
  data: IncomeType[] | ExpenseType[] | undefined;
  name?: string;
  total?: string;
}) {
  const sharedCardRef = useRef(null);

  useEffect(() => {
    anime({
      targets: sharedCardRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 500,
      easing: "linear",
    });
  }, [data]);
  return (
    <Card
      ref={sharedCardRef}
      className='border group/sharedCard anime-db-card rounded-xl gradiendBg ease-in-out flex-1 basis-[50rem] duration-300 flex flex-col justify-between relative opacity-0 translate-y-40 min-h-[20rem]'
    >
      <CardHeader className='mb-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl'>{name}</h2>
          <span>{total}</span>
        </div>
      </CardHeader>
      <div className='flex overflow-hidden w-full h-full'>
        <ResponsiveContainer height='100%' width='100%'>
          <LineChart data={data}>
            <Tooltip content={<CustomTooltip />} />
            <Line type='monotoneX' dataKey='amount' stroke='#8884d8' />
            {/* <XAxis dataKey='date' className='text-xs' /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default SharedCard;

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: any;
  payload?: any;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className='cardGradient p-4 rounded-xl opacity-50'>
        <p className='label'>{`${payload[0].payload.name}`}</p>
        <p className='label'>{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
