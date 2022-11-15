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
}

module.exports = {Repository};
