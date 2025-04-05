import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name should be atleast 2 characters.")
    .max(20, "Name should be maximum 20 characters")
    .regex(/^[A-Za-z\s]+$/, "Only alphabets and space allowed"),
  dob: z.date(),
  email: z.string().email({ message: "Invalid Email Address." }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
