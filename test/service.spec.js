const {Service} = require("../service/service");
const {TaskEntity} = require("../repository/entity/task.entity");
const mockRepository = {
    save: jest.fn(), getNextId: jest.fn().mockReturnValue(1),
}

describe("Task service", () => {
    let service;
    beforeEach(() => {
        service = new Service(mockRepository);
    });
    it("should add task", () => {
        const taskName = "task";
        service.add(taskName);
        expect(mockRepository.save).toHaveBeenCalledTimes(1);
        expect(mockRepository.save).toHaveBeenCalledWith(new TaskEntity(1, taskName, false));
    })
})
