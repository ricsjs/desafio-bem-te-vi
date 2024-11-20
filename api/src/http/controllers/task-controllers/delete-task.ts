import { z } from "zod";
import { makeDeleteTasksService } from "../../../services/factories/tasks-factories/make-delete-task-service";

export async function deleteTask(c: any) {
    const DeleteTaskSchema = z.object({
        id: z.string(),
    });

    const id = c.req.param("id")

    try {
        DeleteTaskSchema.parse({ id });

        const deleteTaskService = makeDeleteTasksService();

        const { message } = await deleteTaskService.execute({ id });

        return c.json({ message });
    } catch (error) {
        return c.status(400).json({ error: "Invalid task ID" });
    }
}
