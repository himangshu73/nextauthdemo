import { z } from "zod";

export const itemSchema = z.object({
  itemName: z.string().min(2, "Min 2 Characters").max(20, "Max 20 Characters"),
  quantity: z.coerce.number().positive().max(100),
  unit: z.enum(["KG", "LTR", "PC"]),
  price: z.coerce.number().positive(),
});
