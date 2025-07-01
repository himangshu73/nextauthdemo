import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be atleast 2 character")
    .max(30, "Name cannot exceed 30 characters")
    .regex(/^[A-Za-z\s]+$/, "Only letters and spaces allowed"),
  email: z
    .string()
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  message: z
    .string()
    .min(2, "Minimum 2 characters")
    .max(300, "Max 30 characters"),
});
