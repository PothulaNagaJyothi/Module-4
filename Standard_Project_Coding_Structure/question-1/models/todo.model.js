import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve('db.json');

const readDB = async () => {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
};

const writeDB = async (data) => {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

export const TodoModel = {
    getAll: async () => {
        const db = await readDB();
        return db.todos;
    },
    getById: async (id) => {
        const db = await readDB();
        return db.todos.find(t => t.id === parseInt(id));
    },
    create: async (title) => {
        const db = await readDB();
        const newTodo = { id: Date.now(), title };
        db.todos.push(newTodo);
        await writeDB(db);
        return newTodo;
    },
    update: async (id, title) => {
        const db = await readDB();
        const index = db.todos.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;
        db.todos[index].title = title;
        await writeDB(db);
        return db.todos[index];
    },
    delete: async (id) => {
        const db = await readDB();
        const initialLength = db.todos.length;
        db.todos = db.todos.filter(t => t.id !== parseInt(id));
        if (db.todos.length === initialLength) return false;
        await writeDB(db);
        return true;
    }
};