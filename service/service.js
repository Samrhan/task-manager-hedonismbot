const {TaskEntity} = require("../repository/entity/task.entity");
const {TaskModel} = require("./model/task.model");

class Service {
    constructor(repository) {
        this.repository = repository;
    }

    add(taskName) {
        const id = this.repository.getNextId();
        const task = new TaskEntity(id, taskName, false);
        this.repository.save(task);
    }

    getAll() {
        return this.repository.getAll().map(task => new TaskModel(task));
    }

    delete(id) {
        this.repository.delete(id);
    }
}

module.exports = {
    Service
}
