import {
  BudgetType,
  ExpenseType,
  IncomeType,
  RecentAddedType,
} from "@/db/schema";
import { create } from "zustand";

export interface IUseFinancial {
  budgets: BudgetType[] | null;
  recentAdded: RecentAddedType[] | null;
  currentExpenses: ExpenseType[] | null;
  currentIncomes: IncomeType[] | null;
  filterMonth: number;
  filterDate: Date | null;
}

export const useFinancial = create<IUseFinancial>((set) => ({
  budgets: null,
  recentAdded: null,
  currentExpenses: null,
  currentIncomes: null,
  filterDate: new Date(),
  filterMonth: new Date().getMonth() + 1,
}));
