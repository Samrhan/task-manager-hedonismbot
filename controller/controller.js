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

    async addTask(taskName) {
        await this.service.add(taskName);
    }

    async getTasks() {
        return await this.service.getAll();
    }

    async prettyPrint() {
        const tasks = await this.getTasks();
        if (tasks.length === 0) {
            return 'No task yet';
        }
        return tasks.map(task => `${task.id} [${task.done ? 'x' : ' '}] ${task.description}`).join('\n');
    }

    async deleteTask(id) {
        const idNumber = parseInt(id);
        if (isNaN(idNumber)) {
            this.interactor.printMessage('Invalid id');
            return;
        }
        await this.service.delete(idNumber);
    }

    async toggleTask(id, status) {
        const idNumber = parseInt(id);
        if (isNaN(idNumber)) {
            this.interactor.printMessage('Invalid id');
            return;
        }
        await this.service.toggle(idNumber, status);
    }

    splitInput(input) {
        return [input.split(' ')[0], input.split(' ').slice(1).join(' ')];
    }

    async parseInput(input) {
        const [operator, args] = this.splitInput(input);
        if (this.operators[operator]) {
            await this.operators[operator](args);
        }
    }

    async mainLoop() {
        while (true) {
            this.interactor.printMessage(await this.prettyPrint());
            const input = this.interactor.readInput();
            if (input === 'q') {
                this.interactor.printMessage('Bye!');
                break;
            }
            await this.parseInput(input);
        }
    }
}

module.exports = {Controller}
