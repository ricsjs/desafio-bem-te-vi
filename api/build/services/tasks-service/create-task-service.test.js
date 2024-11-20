"use strict";

// src/services/tasks-service/create-task-service.test.ts
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

// src/services/tasks-service/create-task-service.ts
var CreateTaskService = class {
  constructor(tasksRepository2) {
    this.tasksRepository = tasksRepository2;
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

// src/services/tasks-service/create-task-service.test.ts
var tasksRepository;
var sut;
(0, import_vitest.describe)("Create Task Service", () => {
  (0, import_vitest.beforeEach)(() => {
    tasksRepository = new MockTasksRepository();
    sut = new CreateTaskService(tasksRepository);
  });
  (0, import_vitest.it)("should be able to create a task", async () => {
    const { task } = await sut.execute({
      userId: "user-id",
      name: "nova task",
      description: "descri\xE7\xE3o da nova task"
    });
    (0, import_vitest.expect)(task.id).toEqual(import_vitest.expect.any(String));
  });
});
