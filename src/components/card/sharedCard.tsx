"use client";

import anime from "animejs";
import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  Cell,
  LabelList,
} from "recharts";
import { Card, CardHeader } from "../ui/card";
import { CategoryType, ExpenseType, IncomeType } from "@/db/schema";

function SharedCard({
  data,
  name = "SharedCard",
  total = 0,
  type = "line",
  finder = "amount",
}: {
  data: ExpenseType[] | IncomeType[] | CategoryType[] | undefined;
  name?: string;
  total?: number;
  type?: "line" | "bar";
  finder?: "amount" | "category" | "name";
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
      className={`border ${
        type === "bar" && "pb-5"
      } group/sharedCard anime-db-card rounded-xl coloredBgGradient ease-in-out flex-1 basis-[50rem] duration-300 flex flex-col justify-between relative opacity-0 translate-y-40 min-h-[20rem]`}
    >
      <CardHeader className='mb-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl'>{name}</h2>
          <span>{total}</span>
        </div>
      </CardHeader>
      <div className='flex overflow-hidden w-full h-full'>
        {type === "line" ? (
          <ResponsiveContainer height='100%' width='100%'>
            <LineChart data={data}>
              <Tooltip content={<CustomTooltip />} />
              <Line type='monotoneX' dataKey={finder} stroke='#8884d8' />
            </LineChart>
          </ResponsiveContainer>
        ) : type === "bar" ? (
          <>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart width={150} height={40} data={data}>
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Bar dataKey={finder} fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
            <div className='w-full -z-10 h-full border items-end absolute bottom-0 left-0 flex justify-around'>
              {data &&
                data.map((entry, index) => (
                  <p key={`label-${index}`}>{entry.name}</p>
                ))}
            </div>
          </>
        ) : null}
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
