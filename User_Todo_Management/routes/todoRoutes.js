import express from 'express';
import { 
    addTodo, 
    getMyTodos, 
    updateTodo, 
    deleteTodo 
} from '../controllers/todoController.js';

const router = express.Router();

// @route   POST /api/todos/add-todo
router.post('/add-todo', addTodo);

// @route   GET /api/todos/get-my-todo/:userId
router.get('/get-my-todo/:userId', getMyTodos);

// @route   PUT /api/todos/update-todo/:todoId
router.put('/update-todo/:todoId', updateTodo);

// @route   DELETE /api/todos/delete-todo/:todoId
router.delete('/delete-todo/:todoId', deleteTodo);

export default router;