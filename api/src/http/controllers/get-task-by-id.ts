import { z } from "zod";
import { makeGetTaskByIdService } from "../../services/factories/make-get-task-by-id-service";

export async function getTaskById(c: any) {
    const GetTaskByIdSchema = z.object({
        id: z.string(),
    });

    const id = c.req.param("id")

    try {
        GetTaskByIdSchema.parse({ id });

        const getTaskByIdService = makeGetTaskByIdService();

        const { task } = await getTaskByIdService.execute({ id });

        return c.json({ task });
    } catch (error) {
        return c.status(400).json({ error: "Invalid task ID" });
    }
}
