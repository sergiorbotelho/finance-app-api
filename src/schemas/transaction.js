import validator from "validator";
import { z } from "zod";
export const createTransactionSchema = z.object({
  user_id: z.uuid({ error: "User ID must be a valid UUID" }),
  name: z.string().trim().min(1, {
    error: "Name is required.",
  }),
  date: z.date({ error: "Date is required" }),
  type: z.enum(["EXPENSE", "EARNING", "INVESTMENT"], {
    error: "Type must be EXPENSE, EARNING or INVESTMENT.",
  }),
  amount: z
    .number({
      error: "Amount must be a number.  ",
    })
    .min(1, {
      error: "Amoount must be greater than 0.",
    })
    .refine((value) =>
      validator.isCurrency(value.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: ".",
      }),
    ),
});
