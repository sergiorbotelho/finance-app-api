import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z
    .string({
      error: "First name is required.",
    })
    .trim()
    .min(1, {
      error: "First name is required.",
    }),
  last_name: z
    .string({
      error: "Last name is required.",
    })
    .trim()
    .min(1, {
      error: "Last name is required.",
    }),
  email: z
    .email({
      error: "Please provide a valid e-mail.",
    })
    .trim()
    .min(1, { error: "E-mail is required." }),
  password: z
    .string({
      error: "Password is required.",
    })
    .trim()
    .min(6, {
      error: "Password must have at least 6 characters.",
    }),
});
