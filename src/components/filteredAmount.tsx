import { ExpenseType } from "@/db/schema";
import { getSumOfCurrentMonth } from "@/lib/utils";
import { useFinancial } from "@/store/useFinancial";
import { useEffect, useState } from "react";
import { AnimatedNumbers } from "./card/animatedNumbers";

export const RenderExpenseAmount = ({ data }: { data: ExpenseType[] }) => {
  const { filterMonth, filterDate } = useFinancial();
  const [amount, setAmount] = useState<any>(0);

  useEffect(() => {
    const { data: expenseData, sum } = getSumOfCurrentMonth(
      data,
      filterMonth,
      filterDate?.getDate()
    );
    setAmount(sum);
  }, [data, filterMonth, filterDate]);
  return <AnimatedNumbers amount={amount} />;
};
