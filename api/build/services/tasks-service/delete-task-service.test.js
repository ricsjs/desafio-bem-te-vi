"use strict";

// src/services/tasks-service/delete-task-service.test.ts
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

// src/services/tasks-service/delete-task-service.ts
var DeleteTaskService = class {
  constructor(tasksRepository2) {
    this.tasksRepository = tasksRepository2;
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

// src/services/tasks-service/delete-task-service.test.ts
var tasksRepository;
var sut;
(0, import_vitest.describe)("Delete Task Service", () => {
  (0, import_vitest.beforeEach)(() => {
    tasksRepository = new MockTasksRepository();
    sut = new DeleteTaskService(tasksRepository);
  });
  const createTask = async (userId) => {
    const task = await tasksRepository.create({
      id: "my-task-id",
      name: "nova task",
      description: "descri\xE7\xE3o da nova task",
      user: { connect: { id: userId } }
    });
    return task;
  };
  (0, import_vitest.it)("should be able to delete a task by id", async () => {
    const task = await createTask("user-id");
    const { message } = await sut.execute({ id: task.id });
    (0, import_vitest.expect)(message).toBe("Task successfully deleted.");
    const taskAfterDelete = await tasksRepository.findById(task.id);
    (0, import_vitest.expect)(taskAfterDelete).toBeNull();
  });
  (0, import_vitest.it)("should throw an error if the task to delete does not exist", async () => {
    await (0, import_vitest.expect)(sut.execute({ id: "non-existent-id" })).rejects.toThrowError("Error deleting task: Error: Task not found");
  });
});
