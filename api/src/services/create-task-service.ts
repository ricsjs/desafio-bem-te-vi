import { Task } from "@prisma/client"
import { TasksRepository } from "../repositories/tasks-repository"

interface CreateTaskServiceRequest {
    name: string
    description: string
    userId: string
}

interface CreateTaskServiceResponse {
    task: Task
}

export class CreateTaskService {
    constructor(
        private tasksRepository: TasksRepository,
    ) { }

    async execute({
        name, description, userId
    }: CreateTaskServiceRequest): Promise<CreateTaskServiceResponse> {

        const task = await this.tasksRepository.create({
            name,
            description,
            user: { connect: { id: userId } },
        })

        return {
            task
        }
    }
}