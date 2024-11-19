import { Task, TaskStatus } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";


interface UpdateTaskServiceRequest {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  userId: string;
}

interface UpdateTaskServiceResponse {
  task: Task;
}
export class UpdateTaskService {
  constructor(
    private tasksRepository: TasksRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    status,
    userId,
  }: UpdateTaskServiceRequest): Promise<UpdateTaskServiceResponse> {
    try {
      const task = await this.tasksRepository.findById(id);

      if (!task) {
        throw new Error("Task not found!");
      }

      const oldTask = await this.tasksRepository.findById(id);

      if (oldTask) {
        const updatedTask = await this.tasksRepository.update({
            id,
            name,
            description,
            status,
            userId,
            created_at: oldTask.created_at
          });

          return { task: updatedTask };
      } else {
        throw new Error("Task not found")
      }
      
    } catch (error) {
      throw new Error("Error updating task: " + error);
    }
  }
}