const {Controller} = require("../controller/controller");
const {TaskDto} = require("../controller/dto/task.dto");

const mockService = {
    add: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn(),
    toggle: jest.fn()
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

    it('should toggle task', () => {
        const id = 1;
        const status = true;
        controller.toggleTask(id, status);
        expect(mockService.toggle).toHaveBeenCalledTimes(1);
        expect(mockService.toggle).toHaveBeenCalledWith(id, status);
    });

    it("should split input", () => {
        const input = '+ task to do';
        const expected = ['+', 'task to do'];
        expect(controller.splitInput(input)).toEqual(expected);
    })

    describe("should parse input", () => {
        it("should add task", () => {
            const input = '+ task to do';
            jest.spyOn(controller, 'addTask');
            controller.parseInput(input);
            expect(controller.addTask).toHaveBeenCalledTimes(1);
            expect(controller.addTask).toHaveBeenCalledWith('task to do');
        });

        it("should delete task", () => {
            const input = '- 1';
            jest.spyOn(controller, 'deleteTask');
            controller.parseInput(input);
            expect(controller.deleteTask).toHaveBeenCalledTimes(1);
            expect(controller.deleteTask).toHaveBeenCalledWith('1');
        });

        it("should toggle task done", () => {
            const input = 'x 1';
            jest.spyOn(controller, 'toggleTask');
            controller.parseInput(input);
            expect(controller.toggleTask).toHaveBeenCalledTimes(1);
            expect(controller.toggleTask).toHaveBeenCalledWith('1', true);
        })

        it("should toggle task undone", () => {
            const input = 'o 1';
            jest.spyOn(controller, 'toggleTask');
            controller.parseInput(input);
            expect(controller.toggleTask).toHaveBeenCalledTimes(1);
            expect(controller.toggleTask).toHaveBeenCalledWith('1', false);
        });
    })


});
