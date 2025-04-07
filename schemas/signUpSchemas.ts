import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name should be atleast 2 characters.")
    .max(30, "Name should be maximum 20 characters")
    .regex(/^[A-Za-z\s]+$/, "Only alphabets and space allowed"),
  email: z.string().email({ message: "Invalid Email Address." }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});
