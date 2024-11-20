import { z } from "zod";
import { makeCreateTasksService } from "../../../services/factories/tasks-factories/make-create-task-service";

export async function createTask(c: any) {
  const CreateTaskSchema = z.object({
    userId: z.string(),
    name: z.string(),
    description: z.string(),
  });

  const { userId, name, description } = await c.req.json();

  try {
    CreateTaskSchema.parse({ userId, name, description });

    const createTaskService = makeCreateTasksService();

    const { task } = await createTaskService.execute({ userId, name, description });

    return c.json({ task });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.status(400).json({ error: "Invalid data", details: error.errors });
    }

    return c.status(500).json({ error: "Internal server error" });
  }
}
