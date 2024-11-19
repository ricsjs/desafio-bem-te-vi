import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { UpdateTaskService } from "../tasks-service/update-task-service";

export function makeUpdateTasksService() {
    const prismaTasksRepository = new PrismaTasksRepository();
    const updateTasksService = new UpdateTaskService(prismaTasksRepository);

    return updateTasksService;
}