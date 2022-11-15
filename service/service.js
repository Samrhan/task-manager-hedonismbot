const {TaskEntity} = require("../repository/entity/task.entity");

class Service {
    constructor(repository) {
        this.repository = repository;
    }

    add(taskName) {
        const id = this.repository.getNextId();
        const task = new TaskEntity(id, taskName, false);
        this.repository.save(task);
    }
}

module.exports = {
    Service
}
