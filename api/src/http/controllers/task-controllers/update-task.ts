import { z } from "zod";
import { makeUpdateTasksService } from "../../../services/factories/tasks-factories/make-update-task-service";

export async function updateTask(c: any) {
  const UpdateTaskSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  });

  const id = c.req.param("id");
  
  const { name, description, status, userId } = await c.req.json();

  try {
    UpdateTaskSchema.parse({ id, name, description, status, userId });

    const updateTaskService = makeUpdateTasksService();
    const { task } = await updateTaskService.execute({ id, name, description, status, userId });

    return c.json({ task });

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod Validation Error: ", error.errors);
      return c.status(400).json({ error: "Invalid data", details: error.errors });
    }

    console.error("Internal Server Error: ", error);
    return c.status(500).json({ error: "Internal server error" });
  }
}
