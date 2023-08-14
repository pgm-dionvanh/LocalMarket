import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const SignUpValidator = withZod(
  z.object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 chars" }),
    repeatPassword: z
      .string(),
    vat: z
      .string()
      .min(1, { message: "Vat number is required" })
      .regex(/^[A-Z]{2}[0-9]{10}$/i, { message: "Vat number is invalid" }),
    redirectTo: z.string().optional(),
  })  .refine(
    ({ password, repeatPassword }) =>
      password === repeatPassword,
    {
      path: ["repeatPassword"],
      message: "Passwords must match",
    }
  )
);