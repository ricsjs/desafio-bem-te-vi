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

// src/services/tasks-service/update-task-service.ts
var update_task_service_exports = {};
__export(update_task_service_exports, {
  UpdateTaskService: () => UpdateTaskService
});
module.exports = __toCommonJS(update_task_service_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateTaskService
});
