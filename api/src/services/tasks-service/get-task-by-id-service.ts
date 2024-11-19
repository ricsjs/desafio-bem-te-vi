import { Task } from "@prisma/client"
import { TasksRepository } from "../repositories/tasks-repository"

interface GetTaskByIdServiceRequest {
    id: string
}

interface GetTaskByIdServiceResponse {
    task: Task | null
}

export class GetTaskByIdService {
    constructor(private tasksRepository: TasksRepository) {}

    async execute({
        id
    }: GetTaskByIdServiceRequest): Promise<GetTaskByIdServiceResponse> {
        const task = await this.tasksRepository.findById(id)
        return {
            task
        }
    }
}