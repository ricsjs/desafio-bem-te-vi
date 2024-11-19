import { Task } from "@prisma/client"
import { TasksRepository } from "../../repositories/tasks-repository"

interface GetAllTasksServiceRequest {
    userId: string
}

interface GetAllTasksServiceResponse {
    tasks: Task[]
}

export class GetAllTasksService {
    constructor(
        private tasksRepository: TasksRepository,
    ) {}

    async execute({
        userId
    }: GetAllTasksServiceRequest): Promise<GetAllTasksServiceResponse> {
        const tasks = await this.tasksRepository.findMany(userId)

        return {
            tasks
        }
    }
}