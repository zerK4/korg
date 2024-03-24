import { create } from "zustand";

export interface ICommands {
  openNewIncome: boolean;
  openIncomeType: boolean;
  openExpense: boolean;
  openCategory: boolean;
}

export const useCommands = create<ICommands>((set) => ({
  openNewIncome: false,
  openIncomeType: false,
  openExpense: false,
  openCategory: false,
}));
