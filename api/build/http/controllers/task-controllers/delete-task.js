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

// src/http/controllers/task-controllers/delete-task.ts
var delete_task_exports = {};
__export(delete_task_exports, {
  deleteTask: () => deleteTask
});
module.exports = __toCommonJS(delete_task_exports);
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

// src/services/tasks-service/delete-task-service.ts
var DeleteTaskService = class {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }
  async execute({
    id
  }) {
    try {
      await this.tasksRepository.delete(id);
      return { message: "Task successfully deleted." };
    } catch (error) {
      throw new Error("Error deleting task: " + error);
    }
  }
};

// src/services/factories/tasks-factories/make-delete-task-service.ts
function makeDeleteTasksService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const deleteTasksService = new DeleteTaskService(prismaTasksRepository);
  return deleteTasksService;
}

// src/http/controllers/task-controllers/delete-task.ts
async function deleteTask(c) {
  const DeleteTaskSchema = import_zod2.z.object({
    id: import_zod2.z.string()
  });
  const id = c.req.param("id");
  try {
    DeleteTaskSchema.parse({ id });
    const deleteTaskService = makeDeleteTasksService();
    const { message } = await deleteTaskService.execute({ id });
    return c.json({ message });
  } catch (error) {
    return c.status(400).json({ error: "Invalid task ID" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteTask
});
