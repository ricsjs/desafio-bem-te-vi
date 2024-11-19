import { TasksRepository } from "../../repositories/tasks-repository";

interface DeleteTaskServiceRequest {
    id: string
}

interface DeleteTaskServiceResponse {
    message: string;
}

export class DeleteTaskService {
    constructor(
        private tasksRepository: TasksRepository,
    ) { }

    async execute({
        id
    }: DeleteTaskServiceRequest): Promise<DeleteTaskServiceResponse> {
        try {
            await this.tasksRepository.delete(id);
            return { message: "Task successfully deleted." };
        } catch (error) {
            throw new Error("Error deleting task: " + error);
        }
    }
}