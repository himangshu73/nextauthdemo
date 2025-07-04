import { z } from "zod";

export const magicEmailSchema = z.object({
  email: z.string().email(),
});
