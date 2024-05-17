import { z } from "zod";

export const dataSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  note: z.string(),
  students: z.array(z.string()),
});

export type Task = z.infer<typeof dataSchema>;
