"use strict";

// src/services/tasks-service/get-all-tasks-service.test.ts
var import_vitest = require("vitest");

// src/repositories/mock/mock-tasks-repository.ts
var import_crypto = require("crypto");
var MockTasksRepository = class {
  items = [];
  async create(data) {
    var _a;
    const task = {
      id: (0, import_crypto.randomUUID)(),
      name: data.name,
      description: data.description,
      status: data.status ?? "PENDING",
      created_at: /* @__PURE__ */ new Date(),
      userId: ((_a = data.user.connect) == null ? void 0 : _a.id) ?? "default-user-id"
    };
    this.items.push(task);
    return task;
  }
  async findMany(userId) {
    return this.items.filter((task) => task.userId === userId);
  }
  async findById(id) {
    return this.items.find((task) => task.id === id) ?? null;
  }
  async update(updatedTask) {
    const index = this.items.findIndex((task) => task.id === updatedTask.id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    this.items[index] = { ...this.items[index], ...updatedTask };
    return this.items[index];
  }
  async delete(id) {
    const index = this.items.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    this.items.splice(index, 1);
  }
};

// src/services/tasks-service/get-all-tasks-service.ts
var GetAllTasksService = class {
  constructor(tasksRepository2) {
    this.tasksRepository = tasksRepository2;
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

// src/services/tasks-service/get-all-tasks-service.test.ts
var tasksRepository;
var sut;
(0, import_vitest.describe)("Get All Tasks Service", () => {
  (0, import_vitest.beforeEach)(() => {
    tasksRepository = new MockTasksRepository();
    sut = new GetAllTasksService(tasksRepository);
  });
  const createTask = async (userId) => {
    const task = await tasksRepository.create({
      name: "nova task",
      description: "descri\xE7\xE3o da nova task",
      user: { connect: { id: userId } }
    });
    return task;
  };
  (0, import_vitest.it)("should be able to get all tasks for a user", async () => {
    await createTask("user-id");
    const { tasks } = await sut.execute({ userId: "user-id" });
    (0, import_vitest.expect)(tasks).toBeInstanceOf(Array);
    (0, import_vitest.expect)(tasks.length).toBeGreaterThan(0);
    (0, import_vitest.expect)(tasks[0]).toHaveProperty("id");
    (0, import_vitest.expect)(tasks[0]).toHaveProperty("name");
    (0, import_vitest.expect)(tasks[0]).toHaveProperty("description");
    (0, import_vitest.expect)(tasks[0]).toHaveProperty("status");
    (0, import_vitest.expect)(tasks[0]).toHaveProperty("created_at");
    (0, import_vitest.expect)(tasks[0].userId).toBe("user-id");
  });
});
