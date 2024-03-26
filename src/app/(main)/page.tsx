import SharedCard from "@/components/card/sharedCard";
import { db } from "@/db";
import React from "react";
import getSession from "../actions/authActions";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { ExpenseWithCategories, budget, expenses, incomes } from "@/db/schema";
import TotalsCard from "@/components/card/totalsCard";
import {
  getCategoriesExpenses,
  getStatisticsOverMonths,
  getSumOfCurrentMonth,
} from "@/lib/utils";
import AnalyticsCalendar from "@/components/analyticsCalendar";
async function page() {
  const { user } = await getSession();

  if (!user) redirect("/login");

  const budgetTypes = await db.query.budget.findMany({
    where: eq(budget.userId, user?.id),
    with: {
      user: true,
    },
  });

  const currentExpenses = await db.query.expenses.findMany({
    where: eq(expenses.userId, user?.id),
    with: {
      category: true,
    },
  });

  const currentIncomes = await db.query.incomes.findMany({
    where: eq(incomes.userId, user?.id),
  });
  const totalExpensesPerCategory = await getCategoriesExpenses({
    expenses: currentExpenses as any,
  });
  console.log(totalExpensesPerCategory, "the expenses");

  const totalBudgetTypes = budgetTypes.reduce((acc, item) => {
    const existingItemIndex = acc.findIndex(
      (accItem) => accItem.name === item.name
    );
    if (existingItemIndex === -1) {
      acc.push({
        name: item.name,
        amount: Number(item.amount),
      });
    } else {
      acc[existingItemIndex].amount += Number(item.amount);
    }
    return acc;
  }, [] as { name: string; amount: number }[]);

  const { sum: thisMonthIncomeSum, data: incomeData } = getSumOfCurrentMonth(
    currentIncomes,
    new Date().getMonth() + 1
  );

  const { sum: thisMonthExpenseSum, data: expenseData } = getSumOfCurrentMonth(
    currentExpenses,
    new Date().getMonth() + 1
  );

  const percentageIncome = getStatisticsOverMonths(currentIncomes);
  const percentageExpense = getStatisticsOverMonths(currentExpenses);

  return (
    <div className='p-2 h-fit overflow-y-hidden'>
      <div className='flex flex-wrap gap-4'>
        <TotalsCard
          data={{
            totalBudgetTypes,
            thisMonthIncomeSum,
            thisMonthExpenseSum,
            percentageIncome,
            percentageExpense,
          }}
        />
        <AnalyticsCalendar
          data={{
            currentExpenses,
            currentIncomes,
          }}
        />
        <SharedCard
          type='bar'
          finder='amount'
          total={thisMonthExpenseSum}
          data={totalExpensesPerCategory as any}
          name='Chelutieli Pe categorii luna curent'
        />
        <SharedCard
          type='line'
          total={thisMonthExpenseSum}
          data={expenseData as any}
          name='Chelutieli luna curenta'
        />
        <SharedCard
          type='line'
          total={thisMonthIncomeSum}
          data={incomeData as any}
          name='Venituri luna curenta'
        />
      </div>
    </div>
  );
}

export default page;
