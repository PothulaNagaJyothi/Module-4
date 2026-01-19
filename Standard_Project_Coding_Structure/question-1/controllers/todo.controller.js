import { TodoModel } from '../models/todo.model.js';

export const getAllTodos = async (req, res) => {
    try {
        const todos = await TodoModel.getAll();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createTodo = async (req, res) => {
    try {
        const newTodo = await TodoModel.create(req.body.title);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Failed to create todo" });
    }
};

export const getTodoById = async (req, res) => {
    try {
        const todo = await TodoModel.getById(req.params.todoId);
        if (!todo) return res.status(404).json({ error: "Todo not found" });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving todo" });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const updated = await TodoModel.update(req.params.todoId, req.body.title);
        if (!updated) return res.status(404).json({ error: "Todo not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: "Error updating todo" });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const success = await TodoModel.delete(req.params.todoId);
        if (!success) return res.status(404).json({ error: "Todo not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting todo" });
    }
};