import express from 'express';
import { signup, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// @route   POST /api/users/signup
// @desc    Register a new user
router.post('/signup', signup);

// @route   DELETE /api/users/:userId
// @desc    Delete user and cascade delete all their todos
router.delete('/:userId', deleteUser);

export default router;