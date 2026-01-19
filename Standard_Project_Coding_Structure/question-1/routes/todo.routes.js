import { Router } from 'express';
import * as TodoController from '../controllers/todo.controller.js';
import rateLimiter from '../middleware/rateLimiter.middleware.js';
import { validateTodo } from '../middleware/validateTodo.middleware.js';

const router = Router();

router.get('/', rateLimiter, TodoController.getAllTodos);
router.post('/add', validateTodo, TodoController.createTodo);
router.get('/:todoId', TodoController.getTodoById);
router.put('/update/:todoId', TodoController.updateTodo);
router.delete('/delete/:todoId', TodoController.deleteTodo);

export default router;