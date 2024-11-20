"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/user-controllers/user-auth.ts
var user_auth_exports = {};
__export(user_auth_exports, {
  userAuthenticate: () => userAuthenticate
});
module.exports = __toCommonJS(user_auth_exports);
var import_zod2 = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev")
  // JWT_SECRET: z.string(),
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variables.", _env.error.format());
  throw new Error("Invalid environment variables.");
}
var env = _env.data;

// src/lib/prisma.ts
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/repositories/prisma/prisma-users-repository.ts
var PrismaUsersRepository = class {
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async create(data) {
    const user = await prisma.user.create({
      data
    });
    return user;
  }
};

// src/services/users-service/user-auth-service.ts
var import_bcryptjs = require("bcryptjs");
var AuthenticateService = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user || !user.password_hash) {
      throw new Error("Invalid credentials");
    }
    const doesPasswordMatches = await (0, import_bcryptjs.compare)(password, user.password_hash);
    if (!doesPasswordMatches) {
      throw new Error("Invalid credentials");
    }
    return {
      user
    };
  }
};

// src/services/factories/users-factories/make-user-auth-service.ts
function makeAuthenticateService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(prismaUsersRepository);
  return authenticateService;
}

// src/http/controllers/user-controllers/user-auth.ts
async function userAuthenticate(c) {
  const AuthenticateSchema = import_zod2.z.object({
    email: import_zod2.z.string().email(),
    password: import_zod2.z.string().min(6)
  });
  const { email, password } = await c.req.json();
  try {
    AuthenticateSchema.parse({ email, password });
    const authenticateService = makeAuthenticateService();
    const { user } = await authenticateService.execute({ email, password });
    var jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7h" }
    );
    return c.json({ user, token });
  } catch (error) {
    if (error instanceof import_zod2.z.ZodError) {
      return c.status(400).json({ error: "Invalid data", details: error.errors });
    } else if (error instanceof Error && error.message === "Invalid credentials") {
      return c.status(401).json({ error: "Invalid credentials" });
    }
    return c.status(500).json({ error: "Internal server error" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userAuthenticate
});
