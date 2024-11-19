import { prisma } from "../../lib/prisma"
import { Task, Prisma } from "@prisma/client"
import { TasksRepository } from "../tasks-repository"

export class PrismaTasksRepository implements TasksRepository {
    create(data: Prisma.TaskCreateInput): Promise<Task> {
        throw new Error("Method not implemented.")
    }
    async findMany(userId: string): Promise<Task[]> {
        const tasks = await prisma.task.findMany({
            where: { 
                userId: userId
            },
        });
    
        return tasks;
    }
    
    findById(id: string): Promise<Task | null> {
        throw new Error("Method not implemented.")
    }
    update(task: Task): Promise<Task> {
        throw new Error("Method not implemented.")
    }

}