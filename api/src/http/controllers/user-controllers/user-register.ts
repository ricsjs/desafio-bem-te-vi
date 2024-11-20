import { z } from "zod";
import { makeUserRegisterService } from "../../../services/factories/users-factories/make-user-register-service";

export async function userRegister(c: any) {
  const CreateTaskSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = await c.req.json();

  try {
    CreateTaskSchema.parse({ name, email, password });

    const createTaskService = makeUserRegisterService();

    const { user } = await createTaskService.execute({ name, email, password });

    return c.json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.status(400).json({ error: "Invalid data", details: error.errors });
    }

    return c.status(500).json({ error: "Internal server error" });
  }
}
