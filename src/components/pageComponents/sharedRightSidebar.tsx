"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { useMediaQuery } from "usehooks-ts";
import anime from "animejs";
import { Separator } from "../ui/separator";
import { ChevronLeft, XIcon } from "lucide-react";
import { RecentAddedType } from "@/db/schema";
import { useFinancial } from "@/store/useFinancial";
import AnalyticsCalendar from "../analyticsCalendar";

function SharedRightSidebar({ children }: { children?: React.ReactNode }) {
  const { recentAdded, currentExpenses, currentIncomes } = useFinancial();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sharedRef = useRef(null);

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

  useEffect(() => {
    const tl = anime.timeline({});
    if (isMobile) {
      tl.add({
        targets: sharedRef.current,
        right: isOpen ? ["-150vw", 0] : [0, "-150vw"],
        opacity: isOpen ? [0, 1] : 0,
        duration: 1000,
        easing: "easeInOutExpo",
      });
    } else {
      tl.add({
        targets: sharedRef.current,
        right: ["-150vw", 0],
        duration: 1000,
        easing: "easeInOutExpo",
      });
    }
  }, [isOpen, isMobile]);

  return (
    <div className='relative'>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute -left-[1rem] flex md:hidden p-0 h-10 w-20 justify-start px-1 hover:-left-[2rem] ease-in-out duration-300 ${
          isMobile ? "-right-[150vw]" : ""
        }`}
      >
        <ChevronLeft size={16} />
      </Button>
      <Card
        ref={sharedRef}
        className='absolute -right-[150vw] md:relative dark:cardGradient opacity-0 scale-0 md:translate-x-40 md:right-0'
      >
        <div className='flex items-center p-2 justify-between gap-2 w-full'>
          {children}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size={"icon"}
            className='min-w-10 bg-orange-400 hover:bg-orange-500 md:hidden'
          >
            <XIcon size={16} />
          </Button>
        </div>
        <AnalyticsCalendar
          noBorder
          data={{
            currentExpenses: currentExpenses,
            currentIncomes: currentIncomes,
          }}
        />
        {recentAdded && (
          <Card className='py-2 dark:bg-black/40'>
            <CardHeader>
              <span className='text-xl'>Adaugate recent</span>
            </CardHeader>
            <Separator />
            <div className='flex flex-col px-4'>
              {recentAdded?.slice(0, 3).map((item, i) => (
                <div
                  key={i}
                  className={`p-2 flex flex-col items-end ${
                    i === 0 ? "border-b" : "last:border-b-0"
                  }`}
                >
                  <span>{item.name}</span>
                  <div className='flex justify-between w-full'>
                    <span className='text-sm opacity-50'>{item.date}</span>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm opacity-50'>{item.what}</span>
                      {item.amount !== null && (
                        <span className='text-sm opacity-50'>
                          {item.amount} <span className='text-xs'>RON</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}

export default SharedRightSidebar;
