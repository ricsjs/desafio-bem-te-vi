import { beforeEach, describe, expect, it } from "vitest";
import { MockTasksRepository } from "../../repositories/mock/mock-tasks-repository";
import { GetAllTasksService } from "./get-all-tasks-service";

let tasksRepository: MockTasksRepository;
let sut: GetAllTasksService;

describe('Get All Tasks Service', () => {
    beforeEach(() => {
        tasksRepository = new MockTasksRepository();
        sut = new GetAllTasksService(tasksRepository);
    });

    // criação de um usuário para ter algum registro no banco de dados de memória
    const createTask = async (userId: string) => {
        const task = await tasksRepository.create({
            name: "nova task",
            description: "descrição da nova task",
            user: { connect: { id: userId } },
        });
        return task;
    };

    it('should be able to get all tasks for a user', async () => {
        await createTask('user-id');

        const { tasks } = await sut.execute({ userId: 'user-id' });

        expect(tasks).toBeInstanceOf(Array);
        expect(tasks.length).toBeGreaterThan(0);

        expect(tasks[0]).toHaveProperty('id');
        expect(tasks[0]).toHaveProperty('name');
        expect(tasks[0]).toHaveProperty('description');
        expect(tasks[0]).toHaveProperty('status');
        expect(tasks[0]).toHaveProperty('created_at');
        expect(tasks[0].userId).toBe('user-id');
    });
});
