const express = require('express');
const fs = require('fs');
const path = require('path');
const rateLimiter = require('../middleware/rateLimiter.middleware');
const validateTodo = require('../middleware/validateTodo.middleware');

const router = express.Router();
const dbPath = path.join(__dirname, '../db.json');

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// GET /todos (Rate limited)
router.get('/', rateLimiter, (req, res) => {
    const db = readDB();
    res.json(db.todos);
});

// POST /todos/add (Validated)
router.post('/add', validateTodo, (req, res) => {
    const db = readDB();
    const newTodo = { id: Date.now(), title: req.body.title };
    db.todos.push(newTodo);
    writeDB(db);
    res.status(201).json(newTodo);
});

// GET /todos/:todoId
router.get('/:todoId', (req, res) => {
    const db = readDB();
    const todo = db.todos.find(t => t.id == req.params.todoId);
    todo ? res.json(todo) : res.status(404).json({ error: "Not found" });
});

// PUT /todos/update/:todoId
router.put('/update/:todoId', (req, res) => {
    const db = readDB();
    const index = db.todos.findIndex(t => t.id == req.params.todoId);
    if (index !== -1) {
        db.todos[index].title = req.body.title || db.todos[index].title;
        writeDB(db);
        return res.json(db.todos[index]);
    }
    res.status(404).json({ error: "Todo not found" });
});

// DELETE /todos/delete/:todoId
router.delete('/delete/:todoId', (req, res) => {
    const db = readDB();
    const filtered = db.todos.filter(t => t.id != req.params.todoId);
    if (db.todos.length === filtered.length) return res.status(404).json({ error: "Not found" });
    writeDB({ todos: filtered });
    res.json({ message: "Deleted successfully" });
});

module.exports = router;