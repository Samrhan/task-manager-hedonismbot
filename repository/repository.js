const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');
const {TaskEntity} = require("./entity/task.entity");

class Repository {
    db;

    constructor() {
        this.db = connect('sqlite.db');
    }

    async prepare() {
        await this.db.query(sql`
            CREATE TABLE IF NOT EXISTS todos
            (
                "id" INTEGER PRIMARY KEY,   
                "name" TEXT,
                "done" BOOLEAN
            );
        `);
    }

    async save(task) {
        await this.prepare();
        await this.db.query(sql`INSERT INTO todos ("id", "name", "done")
                                VALUES (?, ?, ?) ON CONFLICT(id) DO
                                UPDATE
                                SET "name" = ${task.description}, done = ${task.done}`, [task.id, task.description, task.done]);
    }

    async getAll() {
        await this.prepare();
        const todos = await this.db.query(sql`SELECT *
                                              FROM todos`);
        if (todos.length === 0) {
            return [];
        }
        return todos.map(todo => new TaskEntity(todo.id, todo.name, todo.done));
    }

    async getById(id) {
        await this.prepare();
        const todo = await this.db.query(sql`SELECT *
                                             FROM todos
                                             WHERE id = ${id}`);
        return new TaskEntity(todo[0].id, todo[0].name, todo[0].done);
    }

    async delete(id) {
        await this.prepare();
        await this.db.query(sql`DELETE
                                FROM todos
                                WHERE id = ${id}`);
    }

    async toggle(id, status) {
        const task = await this.getById(id);
        task.done = status;
        await this.save(task);
    }

    async getNextId() {
        await this.prepare();
        const query = await this.db.query(sql`SELECT MAX(id)
                                              FROM todos`)
        if (query[0]['MAX(id)'] === null) {
            return 1;
        }
        return query[0]['MAX(id)'] + 1;
    }
}

module.exports = {Repository};
