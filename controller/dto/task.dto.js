class TaskDto {
    description;
    done;

    constructor(description) {
        this.description = description;
        this.done = false;
    }
}

module.exports = {TaskDto};
