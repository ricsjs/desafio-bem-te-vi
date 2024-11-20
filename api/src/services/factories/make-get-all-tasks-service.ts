import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { GetAllTasksService } from "../tasks-service/get-all-tasks-service";

export function makeGetAllTasksService() {
    const prismaTasksRepository = new PrismaTasksRepository();
    const getAllTasksService = new GetAllTasksService(prismaTasksRepository);

    return getAllTasksService;
}