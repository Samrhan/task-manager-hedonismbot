const {Controller} = require("../controller/controller");
const {TaskDto} = require("../controller/dto/task.dto");

const mockService = {
    add: jest.fn(),
}

describe('Controller', function () {
    let controller;

    beforeEach(() => {
        controller = new Controller(mockService);
    })

    it('should add task', () => {
        const taskName = 'task';
        const task = new TaskDto(taskName);
        controller.addTask(taskName);
        expect(mockService.add).toHaveBeenCalledTimes(1);
        expect(mockService.add).toHaveBeenCalledWith(task);
    })
});
