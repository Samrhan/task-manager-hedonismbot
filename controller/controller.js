const prompt = require('prompt-sync')()

class ConsoleInteractor {
    readInput() {
        return prompt('')
    }

    printMessage(message) {
        console.log(message)
    }
}

class Controller {

    interactor;
    operators = {
        '+': (description) => this.addTask(description),
        '-': (id) => this.deleteTask(id),
        'x': (id) => this.toggleTask(id, true),
        'o': (id) => this.toggleTask(id, false),
    }

    constructor(service) {
        this.service = service;
        this.interactor = new ConsoleInteractor();
    }

    addTask(taskName) {
        this.service.add(taskName);
    }

    getTasks() {
        return this.service.getAll();
    }

    prettyPrint() {
        const tasks = this.getTasks();
        if (tasks.length === 0) {
            return 'No task yet';
        }
        return this.getTasks().map(task => `${task.id} [${task.done ? 'x' : ' '}] ${task.description}`).join('\n');
    }

    deleteTask(id) {
        const idNumber = parseInt(id);
        if (isNaN(idNumber)) {
            this.interactor.printMessage('Invalid id');
            return;
        }
        this.service.delete(idNumber);
    }

    toggleTask(id, status) {
        const idNumber = parseInt(id);
        if (isNaN(idNumber)) {
            this.interactor.printMessage('Invalid id');
            return;
        }
        this.service.toggle(idNumber, status);
    }

    splitInput(input) {
        return [input.split(' ')[0], input.split(' ').slice(1).join(' ')];
    }

    parseInput(input) {
        const [operator, args] = this.splitInput(input);
        if (this.operators[operator]) {
            this.operators[operator](args);
        }
    }

    mainLoop() {
        while (true) {
            this.interactor.printMessage(this.prettyPrint());
            const input = this.interactor.readInput();
            if (input === 'q') {
                break;
            }
            this.parseInput(input);
        }
    }
}

module.exports = {Controller}
