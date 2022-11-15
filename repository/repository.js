class Repository {
    todos;
    constructor() {
        this.todos = new Map();
    }

    save(task) {
        this.todos.set(task.id, task);
    }

    getAll() {
        return [...this.todos.values()];
    }

    getById(id) {
        return this.todos.get(id);
    }

    delete(id) {
        this.todos.delete(id);
    }
}

module.exports = {Repository};
