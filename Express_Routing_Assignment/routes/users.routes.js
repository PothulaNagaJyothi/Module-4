const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));


router.post('/add', (req, res) => {
    const db = readDB();
    const newUser = { id: Date.now().toString(), ...req.body };
    db.users.push(newUser);
    writeDB(db);
    res.status(201).json({ message: "User added", user: newUser });
});


router.get('/', (req, res) => {
    res.json(readDB().users);
});


router.get('/:userId', (req, res) => {
    const user = readDB().users.find(u => u.id === req.params.userId);
    user ? res.json(user) : res.status(404).json({ message: "User not found" });
});


router.put('/update/:userId', (req, res) => {
    const db = readDB();
    const index = db.users.findIndex(u => u.id === req.params.userId);
    if (index !== -1) {
        db.users[index] = { ...db.users[index], ...req.body };
        writeDB(db);
        res.json({ message: "User updated", user: db.users[index] });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});


router.delete('/delete/:userId', (req, res) => {
    const db = readDB();
    const filteredUsers = db.users.filter(u => u.id !== req.params.userId);
    if (db.users.length === filteredUsers.length) {
        return res.status(404).json({ message: "User not found" });
    }
    db.users = filteredUsers;
    writeDB(db);
    res.json({ message: "User deleted" });
});

module.exports = router;