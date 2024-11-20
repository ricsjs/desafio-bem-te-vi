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

// src/repositories/mock/mock-tasks-repository.ts
var mock_tasks_repository_exports = {};
__export(mock_tasks_repository_exports, {
  MockTasksRepository: () => MockTasksRepository
});
module.exports = __toCommonJS(mock_tasks_repository_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MockTasksRepository
});
