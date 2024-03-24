import { BudgetType, RecentAddedType } from "@/db/schema";
import { create } from "zustand";

export interface IUseFinancial {
  budgets: BudgetType[] | null;
  recentAdded: RecentAddedType[] | null;
}

export const useFinancial = create<IUseFinancial>((set) => ({
  budgets: null,
  recentAdded: null,
}));
