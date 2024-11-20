import { beforeEach, describe, expect, it } from "vitest";
import { MockTasksRepository } from "../../repositories/mock/mock-tasks-repository";
import { GetTaskByIdService } from "./get-task-by-id-service";

let tasksRepository: MockTasksRepository;
let sut: GetTaskByIdService;

describe('Get Task By Id Service', () => {
    beforeEach(() => {
        tasksRepository = new MockTasksRepository();
        sut = new GetTaskByIdService(tasksRepository);
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


    it('should be able to get a task by id', async () => {
        const task = await createTask('user-id');

        const { task: fetchedTask } = await sut.execute({ id: task.id });

        expect(fetchedTask).toHaveProperty('id');
        expect(fetchedTask).toHaveProperty('name');
        expect(fetchedTask).toHaveProperty('description');
        expect(fetchedTask).toHaveProperty('status');
        expect(fetchedTask).toHaveProperty('created_at');
        expect(fetchedTask?.userId).toBe('user-id');
    });

});
