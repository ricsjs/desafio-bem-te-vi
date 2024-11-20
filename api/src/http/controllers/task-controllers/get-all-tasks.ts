import { z } from "zod";
import { makeGetAllTasksService } from "../../../services/factories/tasks-factories/make-get-all-tasks-service";

export async function getAllTasks(c: any) {
    const GetAllTasksSchema = z.object({
      userId: z.string(),
    });
  
    const userId = c.req.param("userId")
  
    try {
      GetAllTasksSchema.parse({ userId });
  
      const getAllTasksService = makeGetAllTasksService();
  
      const { tasks } = await getAllTasksService.execute({ userId });
  
      return c.json({ tasks });
    } catch (error) {
      return c.status(400).json({ error: "Invalid userId" });
    }
  }
  