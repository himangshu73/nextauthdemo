import { z } from "zod";

export const todolistSchema = z.object({
  todo: z
    .string()
    .min(2, "Name should be atleast 2 characters.")
    .max(50, "Name should be maximum 30 characters"),
});
