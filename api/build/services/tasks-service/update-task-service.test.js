"use strict";

// src/services/tasks-service/update-task-service.test.ts
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

// src/services/tasks-service/update-task-service.ts
var UpdateTaskService = class {
  constructor(tasksRepository2) {
    this.tasksRepository = tasksRepository2;
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

// src/services/tasks-service/update-task-service.test.ts
var import_client = require("@prisma/client");
var tasksRepository;
var sut;
(0, import_vitest.describe)("Update Task Service", () => {
  (0, import_vitest.beforeEach)(() => {
    tasksRepository = new MockTasksRepository();
    sut = new UpdateTaskService(tasksRepository);
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
  (0, import_vitest.it)("should update a task successfully", async () => {
    const userId = "user-id";
    const createdTask = await createTask(userId);
    const updatedData = {
      id: createdTask.id,
      name: "Updated Task Name",
      description: "Updated task description",
      status: import_client.TaskStatus.COMPLETED,
      userId
    };
    const { task } = await sut.execute(updatedData);
    (0, import_vitest.expect)(task).toHaveProperty("id", createdTask.id);
    (0, import_vitest.expect)(task).toHaveProperty("name", "Updated Task Name");
    (0, import_vitest.expect)(task).toHaveProperty("description", "Updated task description");
    (0, import_vitest.expect)(task).toHaveProperty("status", import_client.TaskStatus.COMPLETED);
    (0, import_vitest.expect)(task).toHaveProperty("userId", userId);
  });
});
