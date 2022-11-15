const {Service} = require("../service/service");
const {TaskEntity} = require("../repository/entity/task.entity");
const {TaskModel} = require("../service/model/task.model");
const mockRepository = {
    save: jest.fn(),
    getNextId: jest.fn().mockReturnValue(1),
    getAll: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn()
}

describe("Task service", () => {
    let service;
    beforeEach(() => {
        jest.clearAllMocks();
        service = new Service(mockRepository);
    });
    it("should add task", async () => {
        const taskName = "task";
        await service.add(taskName);
        expect(mockRepository.save).toHaveBeenCalledTimes(1);
        expect(mockRepository.getNextId).toHaveBeenCalledTimes(1);
        expect(mockRepository.save).toHaveBeenCalledWith(new TaskEntity(1, taskName, false));
    })

    it("should get all tasks", async () => {
        const entity = new TaskEntity(1, "task", false);
        mockRepository.getAll.mockReturnValueOnce([entity]);
        const tasks = await service.getAll();
        expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
        expect(tasks).toEqual([new TaskModel(entity)]);
    })

    it("should delete task", async () => {
        const id = 1;
        await service.delete(id);
        expect(mockRepository.delete).toHaveBeenCalledTimes(1);
        expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });

    it("should toggle task", async () => {
        const id = 1;
        const status = true;
        const entity = new TaskEntity(id, "task", false);
        mockRepository.getById.mockReturnValueOnce(entity);
        await service.toggle(id, status);
        expect(mockRepository.getById).toHaveBeenCalledTimes(1);
        expect(mockRepository.getById).toHaveBeenCalledWith(id);
        expect(mockRepository.save).toHaveBeenCalledTimes(1);
        expect(mockRepository.save).toHaveBeenCalledWith(new TaskEntity(id, "task", status));
    });
})
