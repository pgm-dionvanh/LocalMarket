import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const CheckOutValidator = withZod(
  z.object({
    email: z.string().min(1, { message: "Email is required" }).email("Must be a valid email"),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    streetName: z.string().min(1, { message: "Street name is required" }),
    houseNumber: z.string().min(1, { message: "House number is required" }),
    postCode: z.string().min(1, { message: "Post code is required" }),
  })
);