import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const SignInValidator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 chars" }),
    redirectTo: z.string().optional(),
  })
);