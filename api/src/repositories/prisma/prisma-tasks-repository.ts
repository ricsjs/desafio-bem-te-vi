import { prisma } from "../../lib/prisma"
import { Task, Prisma } from "@prisma/client"
import { TasksRepository } from "../tasks-repository"

export class PrismaTasksRepository implements TasksRepository {
    async create(data: Prisma.TaskCreateInput) {
        const task = await prisma.task.create({
            data,
        })

        return task;
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