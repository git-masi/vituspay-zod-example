import { z } from "zod";

export const TransactionStatus = z.enum([
  "link sent",
  "draft",
  "succeeded",
  "sending link",
]);

export const Transaction = z.object({
  pk: z.string(),
  sort: z.string(),
  charge: z.object({
    amount: z.number().int().min(1),
    applicationFee: z.number().int().min(0),
    applicationFeeAmount: z.number().int().min(0),
    card: z.object({
      brand: z.string(),
      holderFullName: z.string(),
      last4: z.number().int(),
    }),
    // =============
    // Refactor Note
    // =============
    // Zod has support for dates but it is not clear how to enforce a timestamp
    // Using number until a better solution is found
    created: z.number(),
  }),
  status: TransactionStatus,
});

export type TransactionType = z.infer<typeof Transaction>;

export const Transactions = z.array(Transaction);

export type TransactionsType = z.infer<typeof Transactions>;
