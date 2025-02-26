import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]),
});
