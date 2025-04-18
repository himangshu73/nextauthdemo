import { z } from "zod";

export const itemSchema = z.object({
  itemName: z.string().min(2, "Min 2 Characters").max(20, "Max 20 Characters"),
  quantity: z
    .number()
    .positive("Only Positive Numbers Allowed.")
    .max(100, "Max 100"),
  unit: z.enum(["KG", "LTR", "PC"]),
  price: z.number().positive("Only Positive Numbers Allowed."),
});
