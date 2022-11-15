class TaskModel {
    id;
    description;
    done;

    constructor(id, description, done) {
        this.id = id;
        this.description = description;
        this.done = done;
    }
}

module.exports = {
    TaskModel
}
