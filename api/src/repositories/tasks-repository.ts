import { Task, Prisma } from "@prisma/client";

export interface TasksRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>;
  findMany(userId: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<Task>;
}