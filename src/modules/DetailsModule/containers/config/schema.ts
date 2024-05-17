import { z } from "zod";

export const dataSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  note: z.string(),
});

export type Task = z.infer<typeof dataSchema>;
