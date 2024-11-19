import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { CreateTaskService } from "../create-task-service";

export function makeCreateTasksService() {
    const prismaTasksRepository = new PrismaTasksRepository();
    const createTasksService = new CreateTaskService(prismaTasksRepository);

    return createTasksService;
}