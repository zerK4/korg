import { z } from "zod";

export const budgetTypeSchema = z.object({
  name: z.string().min(3, {
    message: "Adauga un nume.",
  }),
  details: z.string().optional(),
});
