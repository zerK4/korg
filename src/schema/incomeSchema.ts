import { z } from "zod";

export const incomeSchema = z.object({
  name: z.string().min(3, {
    message: "Un venit trebuie sa aiba cel putin 3 caractere.",
  }),
  value: z.string().min(1, {
    message: "Un venit trebuie sa aiba cel putin 1 caracter.",
  }),
  date: z.string(),
  type: z.string().min(1, {
    message: "Alege metoda in care ai fost platit.",
  }),
  details: z.string().optional(),
});
