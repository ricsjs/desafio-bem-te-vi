import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { GetTaskByIdService } from "../tasks-service/get-task-by-id-service";

export function makeGetTaskByIdService() {
    const prismaTasksRepository = new PrismaTasksRepository();
    const getTaskByIdService = new GetTaskByIdService(prismaTasksRepository);

    return getTaskByIdService;
}