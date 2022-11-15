const {Controller} = require("../controller/controller");
const {TaskDto} = require("../controller/dto/task.dto");

const mockService = {
    add: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn()
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

    it('should get tasks', () => {
        controller.getTasks();
        expect(mockService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should delete task', () => {
        const id = 1;
        controller.deleteTask(id);
        expect(mockService.delete).toHaveBeenCalledTimes(1);
        expect(mockService.delete).toHaveBeenCalledWith(id);
    });


});