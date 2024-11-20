import { beforeEach, describe, expect, it } from "vitest";
import { MockTasksRepository } from "../../repositories/mock/mock-tasks-repository";
import { DeleteTaskService } from "./delete-task-service";

let tasksRepository: MockTasksRepository;
let sut: DeleteTaskService;

describe('Delete Task Service', () => {
    beforeEach(() => {
        tasksRepository = new MockTasksRepository();
        sut = new DeleteTaskService(tasksRepository);
    });

    // Criação de uma tarefa para ter um registro no banco de dados de memória
    const createTask = async (userId: string) => {
        const task = await tasksRepository.create({
            id: "my-task-id",
            name: "nova task",
            description: "descrição da nova task",
            user: { connect: { id: userId } },
        });
        return task;
    };

    it('should be able to delete a task by id', async () => {
        const task = await createTask('user-id');
        
        const { message } = await sut.execute({ id: task.id });

        expect(message).toBe('Task successfully deleted.');

        const taskAfterDelete = await tasksRepository.findById(task.id);

        expect(taskAfterDelete).toBeNull();
    });

    it('should throw an error if the task to delete does not exist', async () => {
        await expect(sut.execute({ id: 'non-existent-id' })).rejects.toThrowError('Error deleting task: Error: Task not found');
    });    
});
