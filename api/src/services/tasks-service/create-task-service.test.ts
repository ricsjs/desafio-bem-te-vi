import { beforeEach, describe, expect, it } from "vitest";
import { MockTasksRepository } from "../../repositories/mock/mock-tasks-repository";
import { CreateTaskService } from "./create-task-service";

let tasksRepository : MockTasksRepository
let sut: CreateTaskService

describe('Create Task Service', () => {
    beforeEach(() => {
        tasksRepository = new MockTasksRepository
        sut = new CreateTaskService(tasksRepository)
    })

    it('should be able to create a task', async () => {
        const { task } = await sut.execute({
            userId: "user-id",
            name: "nova task",
            description: "descrição da nova task"
        })

        expect(task.id).toEqual(expect.any(String))
    })
})