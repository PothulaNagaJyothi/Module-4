import express from 'express';
import dotenv from 'dotenv';

// Import Routes
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes Middleware
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Root Endpoint for health check
app.get('/', (req, res) => {
    res.json({ message: "User-Todo Management API is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    Server is firing on port ${PORT}
    User Endpoints: http://localhost:${PORT}/api/users
    Todo Endpoints: http://localhost:${PORT}/api/todos
    `);
});