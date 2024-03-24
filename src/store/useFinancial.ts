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
}

export const useFinancial = create<IUseFinancial>((set) => ({
  budgets: null,
  recentAdded: null,
  currentExpenses: null,
  currentIncomes: null,
}));
