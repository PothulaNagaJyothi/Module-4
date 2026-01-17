const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));


router.post('/add', (req, res) => {
    const db = readDB();
    const newTodo = { id: Date.now().toString(), ...req.body };
    db.todos.push(newTodo);
    writeDB(db);
    res.status(201).json({ message: "Todo added", todo: newTodo });
});


router.get('/', (req, res) => {
    res.json(readDB().todos);
});


router.get('/:todoId', (req, res) => {
    const todo = readDB().todos.find(t => t.id === req.params.todoId);
    todo ? res.json(todo) : res.status(404).json({ message: "Todo not found" });
});


router.put('/update/:todoId', (req, res) => {
    const db = readDB();
    const index = db.todos.findIndex(t => t.id === req.params.todoId);
    if (index !== -1) {
        db.todos[index] = { ...db.todos[index], ...req.body };
        writeDB(db);
        res.json({ message: "Todo updated", todo: db.todos[index] });
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
});


router.delete('/delete/:todoId', (req, res) => {
    const db = readDB();
    const filteredTodos = db.todos.filter(t => t.id !== req.params.todoId);
    if (db.todos.length === filteredTodos.length) {
        return res.status(404).json({ message: "Todo not found" });
    }
    db.todos = filteredTodos;
    writeDB(db);
    res.json({ message: "Todo deleted" });
});

module.exports = router;