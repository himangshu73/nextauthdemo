import { z } from "zod";

export const forgotPasswordEmailSchema = z.object({
  email: z.string().email(),
});
