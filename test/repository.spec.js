const {TaskEntity} = require("../repository/entity/task.entity");
const {Repository} = require("../repository/repository");

mockDb = {
    query: jest.fn()
}

describe('Task Manager Repository', () => {
    let repository;
    beforeEach(() => {
        jest.clearAllMocks();
        repository = new Repository();
        repository.db = mockDb;
        jest.spyOn(repository, 'prepare').mockImplementation(() => {
        });
    });

    it('should add task', async () => {
        const task = new TaskEntity(1, 'task', false);
        await repository.save(task);
        expect(mockDb.query).toHaveBeenCalledTimes(1);
    });

    it('should get all tasks', async () => {
        const task = new TaskEntity(1, 'task', false);
        mockDb.query.mockReturnValueOnce([task]);
        await repository.getAll();
        expect(mockDb.query).toHaveBeenCalledTimes(1);
    });

    it('should get task by id', async () => {
        const task = new TaskEntity(1, 'task', false);
        mockDb.query.mockReturnValueOnce([task]);
        await repository.getById(1);
        expect(mockDb.query).toHaveBeenCalledTimes(1);
    });

    it('should delete task', async () => {
        await repository.delete(1);
        expect(mockDb.query).toHaveBeenCalledTimes(1);
    });

    it('should toggle task', async () => {
        jest.spyOn(repository, 'getById').mockReturnValueOnce(new TaskEntity(1, 'task', false));
        await repository.toggle(1, true);
        expect(mockDb.query).toHaveBeenCalledTimes(1);
    });

    it('should get next id when empty', async () => {
        mockDb.query.mockReturnValueOnce([{'MAX(id)': null}]);
        const id = await repository.getNextId();
        expect(id).toBe(1);
    });

    it('should get next id when not empty', async () => {
        mockDb.query.mockReturnValueOnce([{'MAX(id)': 1}]);
        const id = await repository.getNextId();
        expect(id).toBe(2);
    });
});
