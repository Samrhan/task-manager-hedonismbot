const {TaskEntity} = require("../repository/entity/task.entity");
const {Repository} = require("../repository/repository");


describe('Task Manager Repository', () => {
    let repository;
    beforeEach(() => {
        repository = new Repository();
    });

    it('should add task', () => {
        const task = new TaskEntity(1, 'task', false);
        repository.save(task);
        expect(repository.todos.get(1)).toEqual(task);
    });

    it('should get all tasks', () => {
        const task = new TaskEntity(1, 'task', false);
        repository.save(task);
        expect(repository.getAll()).toEqual([task]);
    });
});
