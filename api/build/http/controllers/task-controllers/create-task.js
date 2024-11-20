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

// src/http/controllers/task-controllers/create-task.ts
var create_task_exports = {};
__export(create_task_exports, {
  createTask: () => createTask
});
module.exports = __toCommonJS(create_task_exports);
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

// src/repositories/prisma/prisma-tasks-repository.ts
var PrismaTasksRepository = class {
  async create(data) {
    const task = await prisma.task.create({
      data
    });
    return task;
  }
  async findMany(userId) {
    const tasks = await prisma.task.findMany({
      where: {
        userId
      }
    });
    return tasks;
  }
  async findById(id) {
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    });
    return task;
  }
  async update(data) {
    const task = await prisma.task.update({
      where: {
        id: data.id
      },
      data
    });
    return task;
  }
  async delete(id) {
    await prisma.task.delete({
      where: {
        id
      }
    });
  }
};

// src/services/tasks-service/create-task-service.ts
var CreateTaskService = class {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }
  async execute({
    name,
    description,
    userId
  }) {
    const task = await this.tasksRepository.create({
      name,
      description,
      user: { connect: { id: userId } }
    });
    return {
      task
    };
  }
};

// src/services/factories/tasks-factories/make-create-task-service.ts
function makeCreateTasksService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const createTasksService = new CreateTaskService(prismaTasksRepository);
  return createTasksService;
}

// src/http/controllers/task-controllers/create-task.ts
async function createTask(c) {
  const CreateTaskSchema = import_zod2.z.object({
    userId: import_zod2.z.string(),
    name: import_zod2.z.string(),
    description: import_zod2.z.string()
  });
  const { userId, name, description } = await c.req.json();
  try {
    CreateTaskSchema.parse({ userId, name, description });
    const createTaskService = makeCreateTasksService();
    const { task } = await createTaskService.execute({ userId, name, description });
    return c.json({ task });
  } catch (error) {
    if (error instanceof import_zod2.z.ZodError) {
      return c.status(400).json({ error: "Invalid data", details: error.errors });
    }
    return c.status(500).json({ error: "Internal server error" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTask
});
