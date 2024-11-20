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

// src/http/controllers/task-controllers/update-task.ts
var update_task_exports = {};
__export(update_task_exports, {
  updateTask: () => updateTask
});
module.exports = __toCommonJS(update_task_exports);
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

// src/services/tasks-service/update-task-service.ts
var UpdateTaskService = class {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }
  async execute({
    id,
    name,
    description,
    status,
    userId
  }) {
    try {
      const task = await this.tasksRepository.findById(id);
      if (!task) {
        throw new Error("Task not found!");
      }
      const oldTask = await this.tasksRepository.findById(id);
      if (oldTask) {
        const updatedTask = await this.tasksRepository.update({
          id,
          name,
          description,
          status,
          userId,
          created_at: oldTask.created_at
        });
        return { task: updatedTask };
      } else {
        throw new Error("Task not found");
      }
    } catch (error) {
      throw new Error("Error updating task: " + error);
    }
  }
};

// src/services/factories/tasks-factories/make-update-task-service.ts
function makeUpdateTasksService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const updateTasksService = new UpdateTaskService(prismaTasksRepository);
  return updateTasksService;
}

// src/http/controllers/task-controllers/update-task.ts
async function updateTask(c) {
  const UpdateTaskSchema = import_zod2.z.object({
    id: import_zod2.z.string(),
    name: import_zod2.z.string(),
    description: import_zod2.z.string(),
    status: import_zod2.z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
  });
  const id = c.req.param("id");
  const { name, description, status, userId } = await c.req.json();
  try {
    UpdateTaskSchema.parse({ id, name, description, status, userId });
    const updateTaskService = makeUpdateTasksService();
    const { task } = await updateTaskService.execute({ id, name, description, status, userId });
    return c.json({ task });
  } catch (error) {
    if (error instanceof import_zod2.z.ZodError) {
      console.error("Zod Validation Error: ", error.errors);
      return c.status(400).json({ error: "Invalid data", details: error.errors });
    }
    console.error("Internal Server Error: ", error);
    return c.status(500).json({ error: "Internal server error" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateTask
});
