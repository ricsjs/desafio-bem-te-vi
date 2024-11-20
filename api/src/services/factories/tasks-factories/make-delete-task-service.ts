import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository";
import { DeleteTaskService } from "../../tasks-service/delete-task-service";

export function makeDeleteTasksService() {
    const prismaTasksRepository = new PrismaTasksRepository();
    const deleteTasksService = new DeleteTaskService(prismaTasksRepository);

    return deleteTasksService;
}