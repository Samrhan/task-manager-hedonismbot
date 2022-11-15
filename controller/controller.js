const {TaskDto} = require("./dto/task.dto");
const prompt = require('prompt-sync')()

class Controller {
    constructor(service) {
        this.service = service;
    }

    addTask(taskName) {
        const task = new TaskDto(taskName);
        this.service.add(task);
    }

    getTasks() {
        return this.service.getAll();
    }

    deleteTask(id) {
        const task = this.service.delete(id)
    }

    toggleTask(id, status) {
        const task = this.service.toggle(id, status);
    }
}

module.exports = {Controller}
