const {TaskEntity} = require("../repository/entity/task.entity");
const {TaskModel} = require("./model/task.model");

class Service {
    constructor(repository) {
        this.repository = repository;
    }

    async add(taskName) {
        const id = await this.repository.getNextId()
        const task = new TaskEntity(id, taskName, false);
        await this.repository.save(task);
    }

    async getAll() {
        const todos = await this.repository.getAll();
        return todos.map(task => new TaskModel(task));
    }

    async delete(id) {
        await this.repository.delete(id);
    }

    async toggle(id, status) {
        const task = await this.repository.getById(id);
        task.done = status;
        await this.repository.save(task);
    }
}

module.exports = {
    Service
}
