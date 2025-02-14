import { z } from "zod"

export const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().optional(),
  dueDate: z.coerce.date({ required_error: "Due date is required" }),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "CRITICAL"]),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ON_HOLD"]),
})
