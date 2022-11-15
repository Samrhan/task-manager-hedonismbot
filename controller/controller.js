const {TaskDto} = require("./dto/task.dto");
const prompt = require('prompt-sync')()

class Controller {

    operators = {
        '+': (description) => this.addTask(description),
        '-': (id) => this.deleteTask(id),
        'x': (id) => this.toggleTask(id, true),
        'o': (id) => this.toggleTask(id, false),
    }

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
        this.service.delete(id)
    }

    toggleTask(id, status) {
        this.service.toggle(id, status);
    }

    splitInput(input) {
        return [input.split(' ')[0], input.split(' ').slice(1).join(' ')];
    }

    parseInput(input) {
        const [operator, args] = this.splitInput(input);
        if (this.operators[operator]) {
            console.log(this.operators[operator]);
            this.operators[operator](args);
        }
    }

    mainLoop() {
        while (true) {
            const input = prompt('');
            if (input === 'q') {
                break;
            }
            this.parseInput(input);
        }
    }
}

module.exports = {Controller}
