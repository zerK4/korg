import { z } from "zod";

export const expenseSchema = z.object({
  name: z.string().min(3, {
    message: "O cheltuiala trebuie sa aiba cel putin 3 caractere.",
  }),
  category: z.string().min(1, {
    message: "Alege o categorie.",
  }),
  amount: z.string().min(1, {
    message: "Valoarea trebuie sa fie de cel putin 1 caracter.",
  }),
  date: z.number(),
  from: z.string().min(1),
});
