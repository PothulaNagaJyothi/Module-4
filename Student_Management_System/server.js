import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const PORT = 3000;
const DB_PATH = path.resolve('db.json');

app.use(express.json());

const readDB = async () => {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
};

const writeDB = async (data) => {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};



app.get('/students', async (req, res) => {
    try {
        const students = await readDB();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error reading data" });
    }
});


app.post('/students', async (req, res) => {
    try {
        const { name, course, year } = req.body;
        const students = await readDB();
        
        const newStudent = {
            id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
            name,
            course,
            year
        };

        students.push(newStudent);
        await writeDB(students);
        res.status(201).json({ message: "Student added successfully", student: newStudent });
    } catch (error) {
        res.status(500).json({ message: "Error saving student" });
    }
});


app.put('/students', async (req, res) => {
    try {
        const { id, name, course, year } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: "Student ID is required for update" });
        }

        let students = await readDB();
        
        const index = students.findIndex(s => s.id === Number(id));

        if (index === -1) {
            return res.status(404).json({ message: "Student not found" });
        }

        students[index] = { 
            ...students[index], 
            ...(name && { name }), 
            ...(course && { course }), 
            ...(year && { year }) 
        };

        await writeDB(students);
        
        res.json({ 
            message: "Student updated successfully", 
            student: students[index] 
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating student", error: error.message });
    }
});


app.delete('/students/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let students = await readDB();
        const filteredStudents = students.filter(s => s.id !== id);

        if (students.length === filteredStudents.length) {
            return res.status(404).json({ message: "Student not found" });
        }

        await writeDB(filteredStudents);
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});