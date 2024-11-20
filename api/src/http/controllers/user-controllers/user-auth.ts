import { z } from "zod";
import { makeAuthenticateService } from "../../../services/factories/users-factories/make-user-auth-service";

export async function userAuthenticate(c: any) {
  const AuthenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = await c.req.json();

  try {
    AuthenticateSchema.parse({ email, password });

    const authenticateService = makeAuthenticateService();

    const { user } = await authenticateService.execute({ email, password });

    var jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7h" }
    );

    return c.json({ user, token });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.status(400).json({ error: "Invalid data", details: error.errors });
    } else if (error instanceof Error && error.message === "Invalid credentials") {
      return c.status(401).json({ error: "Invalid credentials" });
    }
    return c.status(500).json({ error: "Internal server error" });
  }
}
