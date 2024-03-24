import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, {
    message: "O categorie trebuie sa aiba cel putin 3 caractere.",
  }),
});
