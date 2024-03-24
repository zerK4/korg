import { removeCategory } from "@/app/actions/categoryActions";
import { removeExpense } from "@/app/actions/expenseActions";
import { toast } from "sonner";
import { create } from "zustand";

export interface IUseFunctions {
  deleteSomething: ({
    id,
    deleteWhat,
  }: {
    id: string;
    deleteWhat: "expense" | "category" | "income";
  }) => Promise<void>;
}

export const useFunctions = create<IUseFunctions>((set) => ({
  deleteSomething: async ({
    id,
    deleteWhat,
  }: {
    id: string;
    deleteWhat: "expense" | "category" | "income";
  }) => {
    switch (deleteWhat) {
      case "expense":
        const promiseExpense = removeExpense(id);
        toast.promise(promiseExpense, {
          loading: "Stergere...",
          success: "Cheltuiala a fost stersa cu succes",
          error: "Eroare la stergerea cheltuielii",
        });
        break;
      case "category":
        const promiseCategory = removeCategory(id);
        toast.promise(promiseCategory, {
          loading: "Stergere...",
          success: "Categoria a fost stearsa cu succes",
          error: "Eroare la stergerea categoriei",
        });
        break;
      case "income":
        const promiseIncome = removeCategory(id);
        toast.promise(promiseIncome, {
          loading: "Stergere...",
          success: "Venitul a fost sters cu succes",
          error: "Eroare la stergerea venitului",
        });
        break;
    }
  },
}));
