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

// src/services/factories/tasks-factories/make-get-all-tasks-service.ts
var make_get_all_tasks_service_exports = {};
__export(make_get_all_tasks_service_exports, {
  makeGetAllTasksService: () => makeGetAllTasksService
});
module.exports = __toCommonJS(make_get_all_tasks_service_exports);

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

// src/services/tasks-service/get-all-tasks-service.ts
var GetAllTasksService = class {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }
  async execute({
    userId
  }) {
    const tasks = await this.tasksRepository.findMany(userId);
    return {
      tasks
    };
  }
};

// src/services/factories/tasks-factories/make-get-all-tasks-service.ts
function makeGetAllTasksService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const getAllTasksService = new GetAllTasksService(prismaTasksRepository);
  return getAllTasksService;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeGetAllTasksService
});
