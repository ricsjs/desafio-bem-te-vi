import { Prisma, Task } from "@prisma/client";
import { TasksRepository } from "../tasks-repository";
import { randomUUID } from "crypto";

export class MockTasksRepository implements TasksRepository {
    public items: Task[] = [];

    async create(data: Prisma.TaskCreateInput) {
        const task = {
            id: randomUUID(),
            name: data.name,
            description: data.description,
            status: data.status ?? 'PENDING',
            created_at: new Date(),
            userId: data.user.connect?.id ?? 'default-user-id'
        }

        this.items.push(task)

        return task
    }

    async findMany(userId: string): Promise<Task[]> {
        return this.items.filter(task => task.userId === userId);
    }

    async findById(id: string): Promise<Task | null> {
        return this.items.find(task => task.id === id) ?? null;
    }

    async update(updatedTask: Task): Promise<Task> {
        const index = this.items.findIndex(task => task.id === updatedTask.id);
        if (index === -1) {
          throw new Error("Task not found");
        }
    
        this.items[index] = { ...this.items[index], ...updatedTask };
    
        return this.items[index];
      }

      async delete(id: string): Promise<void> {
        const index = this.items.findIndex(task => task.id === id);
        if (index === -1) {
          throw new Error("Task not found");
        }
    
        this.items.splice(index, 1);
      }
}