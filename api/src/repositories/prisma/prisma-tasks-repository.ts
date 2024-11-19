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

    async findById(id: string) {
        const task = await prisma.task.findUnique({
            where: {
                id
            }
        })

        return task;
    }

    async update(data: Task) {
        const task = await prisma.task.update({
            where: {
                id: data.id
            },
            data
        })

        return task;
    }

    async delete(id: string): Promise<void> {
        await prisma.task.delete({
            where: {
                id
            }
        })
    }

}