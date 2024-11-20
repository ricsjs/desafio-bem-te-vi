import { beforeEach, describe, expect, it } from "vitest";
import { MockTasksRepository } from "../../repositories/mock/mock-tasks-repository";  // Supondo que você tenha um mock repository
import { UpdateTaskService } from "./update-task-service";  // O caminho do seu serviço de update
import { TaskStatus } from "@prisma/client";

let tasksRepository: MockTasksRepository;
let sut: UpdateTaskService;

describe('Update Task Service', () => {
    beforeEach(() => {
        tasksRepository = new MockTasksRepository();
        sut = new UpdateTaskService(tasksRepository);
    });

    // criação de um usuário para ter algum registro no banco de dados de memória
    const createTask = async (userId: string) => {
        const task = await tasksRepository.create({
            id: "my-task-id",
            name: "nova task",
            description: "descrição da nova task",
            user: { connect: { id: userId } },
        });
        return task;
    };

    it('should update a task successfully', async () => {
        const userId = 'user-id';
        const createdTask = await createTask(userId);

        const updatedData = {
            id: createdTask.id,
            name: 'Updated Task Name',
            description: 'Updated task description',
            status: TaskStatus.COMPLETED,
            userId: userId,
        };

        const { task } = await sut.execute(updatedData);

        console.log({ task })

        expect(task).toHaveProperty('id', createdTask.id);
        expect(task).toHaveProperty('name', 'Updated Task Name');
        expect(task).toHaveProperty('description', 'Updated task description');
        expect(task).toHaveProperty('status', TaskStatus.COMPLETED);
        expect(task).toHaveProperty('userId', userId);
    });

});
