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

// src/http/routes/tasks-routes.ts
var tasks_routes_exports = {};
__export(tasks_routes_exports, {
  default: () => tasks_routes_default
});
module.exports = __toCommonJS(tasks_routes_exports);
var import_hono = require("hono");

// src/http/controllers/task-controllers/get-all-tasks.ts
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

// src/http/controllers/task-controllers/get-all-tasks.ts
async function getAllTasks(c) {
  const GetAllTasksSchema = import_zod2.z.object({
    userId: import_zod2.z.string()
  });
  const userId = c.req.param("userId");
  try {
    GetAllTasksSchema.parse({ userId });
    const getAllTasksService = makeGetAllTasksService();
    const { tasks } = await getAllTasksService.execute({ userId });
    return c.json({ tasks });
  } catch (error) {
    return c.status(400).json({ error: "Invalid userId" });
  }
}

// src/http/controllers/task-controllers/create-task.ts
var import_zod3 = require("zod");

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
  const CreateTaskSchema = import_zod3.z.object({
    userId: import_zod3.z.string(),
    name: import_zod3.z.string(),
    description: import_zod3.z.string()
  });
  const { userId, name, description } = await c.req.json();
  try {
    CreateTaskSchema.parse({ userId, name, description });
    const createTaskService = makeCreateTasksService();
    const { task } = await createTaskService.execute({ userId, name, description });
    return c.json({ task });
  } catch (error) {
    if (error instanceof import_zod3.z.ZodError) {
      return c.status(400).json({ error: "Invalid data", details: error.errors });
    }
    return c.status(500).json({ error: "Internal server error" });
  }
}

// src/http/controllers/task-controllers/get-task-by-id.ts
var import_zod4 = require("zod");

// src/services/tasks-service/get-task-by-id-service.ts
var GetTaskByIdService = class {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }
  async execute({
    id
  }) {
    const task = await this.tasksRepository.findById(id);
    return {
      task
    };
  }
};

// src/services/factories/tasks-factories/make-get-task-by-id-service.ts
function makeGetTaskByIdService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const getTaskByIdService = new GetTaskByIdService(prismaTasksRepository);
  return getTaskByIdService;
}

// src/http/controllers/task-controllers/get-task-by-id.ts
async function getTaskById(c) {
  const GetTaskByIdSchema = import_zod4.z.object({
    id: import_zod4.z.string()
  });
  const id = c.req.param("id");
  try {
    GetTaskByIdSchema.parse({ id });
    const getTaskByIdService = makeGetTaskByIdService();
    const { task } = await getTaskByIdService.execute({ id });
    return c.json({ task });
  } catch (error) {
    return c.status(400).json({ error: "Invalid task ID" });
  }
}

// src/http/controllers/task-controllers/update-task.ts
var import_zod5 = require("zod");

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
  const UpdateTaskSchema = import_zod5.z.object({
    id: import_zod5.z.string(),
    name: import_zod5.z.string(),
    description: import_zod5.z.string(),
    status: import_zod5.z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
  });
  const id = c.req.param("id");
  const { name, description, status, userId } = await c.req.json();
  try {
    UpdateTaskSchema.parse({ id, name, description, status, userId });
    const updateTaskService = makeUpdateTasksService();
    const { task } = await updateTaskService.execute({ id, name, description, status, userId });
    return c.json({ task });
  } catch (error) {
    if (error instanceof import_zod5.z.ZodError) {
      console.error("Zod Validation Error: ", error.errors);
      return c.status(400).json({ error: "Invalid data", details: error.errors });
    }
    console.error("Internal Server Error: ", error);
    return c.status(500).json({ error: "Internal server error" });
  }
}

// src/http/controllers/task-controllers/delete-task.ts
var import_zod6 = require("zod");

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
  const DeleteTaskSchema = import_zod6.z.object({
    id: import_zod6.z.string()
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

// src/middlewares/auth-jwt.ts
var authenticateJWT = (c, next) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("Token not found");
    return c.status(401).json({ error: "Token not found" });
  }
  try {
    var jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    c.set("user", decoded);
    return next();
  } catch (error) {
    return c.status(403).json({ error: "Invalid token" });
  }
};

// src/http/routes/tasks-routes.ts
var tasksRouter = new import_hono.Hono();
tasksRouter.use("*", authenticateJWT);
tasksRouter.get("/user/:userId", async (c) => {
  return getAllTasks(c);
});
tasksRouter.get("/task/:id", async (c) => {
  return getTaskById(c);
});
tasksRouter.post("/create", async (c) => {
  return createTask(c);
});
tasksRouter.put("/update/:id", async (c) => {
  return updateTask(c);
});
tasksRouter.delete("/delete/:id", async (c) => {
  return deleteTask(c);
});
var tasks_routes_default = tasksRouter;
