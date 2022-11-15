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

    it('should get task by id', () => {
        const task = new TaskEntity(1, 'task', false);
        repository.save(task);
        expect(repository.getById(1)).toEqual(task)
    });

    it('should delete task', () => {
        const task = new TaskEntity(1, 'task', false);
        repository.save(task);
        repository.delete(1);
        expect(repository.todos.get(1)).toBeUndefined();
    });

    it('should toggle task', () => {
        const task = new TaskEntity(1, 'task', false);
        repository.save(task);
        repository.toggle(1, true);
        expect(repository.todos.get(1).done).toBeTruthy();
    });
});
