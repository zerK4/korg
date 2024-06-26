import { ExpenseType, ExpenseWithCategories, IncomeType } from "@/db/schema";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseCookie(cookieString: string | undefined | ""): {
  name: string | null;
  value: string | null;
  attributes: { [key: string]: string | boolean } | null;
} {
  if (!cookieString) return { name: null, value: null, attributes: null };

  const parts = cookieString.split(";");
  const [nameValue, ...attributes] = parts;

  const [name, value] = nameValue.trim().split("=");

  const attributeObject: { [key: string]: string | boolean } = {};
  for (const attribute of attributes) {
    const [key, value] = attribute.trim().split("=");
    attributeObject[key] = value ? value : true; // Handle attributes without values (e.g., HttpOnly)
  }

  return { name, value, attributes: attributeObject };
}

export function generateStrongToken(length: number = 64): string {
  const alphabet: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token: string = "";
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * alphabet.length);
    token += alphabet.charAt(randomIndex);
  }
  return token;
}

export function calculatePercentageChange(
  data: any[],
): { change: number | null; direction: string } | null {
  if (data.length < 2) {
    return null; // Need at least two data points for percentage change
  }

  const firstAmount = data[0].amount;
  const lastAmount = data[data.length - 1].amount;

  // Check for division by zero (both amounts are the same)
  if (firstAmount === lastAmount) {
    return { change: 0, direction: "flat" };
  }

  const change = lastAmount - firstAmount;
  const percentageChange = (change / firstAmount) * 100;

  const direction = change > 0 ? "up" : "down";

  return { change: Number(percentageChange.toFixed(2)), direction };
}

export const getTodayMonthNumber = () => {
  return new Date().getMonth();
};

export function getSumOfCurrentMonth(
  data: IncomeType[] | ExpenseType[],
  monthNumber: number,
  monthDay: number | null = null,
) {
  const monthData = data
    .map((income) => {
      if (new Date(income.date as number).getMonth() + 1 === monthNumber) {
        if (monthDay !== null) {
          if (new Date(income.date as number).getDate() === monthDay) {
            return income;
          }
        } else {
          return income;
        }
      }
    })
    .filter((income) => income !== undefined);

  const sum = monthData.reduce((acc, curr) => acc + curr!.amount, 0);

  return {
    sum: sum,
    data: monthData,
  };
}

export const getStatisticsOverMonths = (data: IncomeType[] | ExpenseType[]) => {
  const todayMonthNumber = Number(getTodayMonthNumber());
  const lastMonthNumber = todayMonthNumber - 1;

  const currentMonthData = data.filter(
    (item) => new Date(item.date as number).getMonth() === todayMonthNumber,
  );
  const lastMonthData = data.filter(
    (item) => new Date(item.date as number).getMonth() === lastMonthNumber,
  );

  const sumOfCurrentMonth = currentMonthData.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );
  const sumOfLastMonth = lastMonthData.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );

  const change = sumOfCurrentMonth - sumOfLastMonth;
  let percentageChange = 0;
  let direction = "same";

  if (sumOfLastMonth !== 0) {
    percentageChange = (change / sumOfLastMonth) * 100;
    direction =
      sumOfCurrentMonth > sumOfLastMonth
        ? "up"
        : sumOfCurrentMonth < sumOfLastMonth
          ? "down"
          : "same";
  }

  return {
    change: Number(percentageChange.toFixed(2)),
    direction,
  };
};

export async function getCategoriesExpenses({
  expenses,
  month = new Date().getMonth() + 1,
}: {
  expenses: ExpenseWithCategories[] | undefined;
  month?: number;
}) {
  try {
    if (!expenses) return null;
    const data: any[] = [];

    expenses.forEach((expense) => {
      const expenseMonth = new Date(expense.date as number).getMonth() + 1;
      if (expenseMonth === month) {
        const categoryIndex = data.findIndex(
          (x) => x.name === expense.category?.name,
        );

        if (categoryIndex !== -1) {
          data[categoryIndex].amount += Number(expense.amount);
        } else {
          data.push({
            ...expense.category,
            amount: Number(expense.amount),
          });
        }
      }
    });

    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
