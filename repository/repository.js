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

    toggle(id, status) {
        const task = this.todos.get(id);
        task.done = status;
        this.todos.set(id, task);
    }

    getNextId() {
        return this.todos.size + 1;
    }
}

module.exports = {Repository};
