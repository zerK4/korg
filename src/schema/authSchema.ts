import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address.",
  }),
  name: z.string().optional(),
});
