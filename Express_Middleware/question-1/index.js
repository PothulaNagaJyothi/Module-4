const express = require('express');
const loggerMiddleware = require('./middleware/logger.middleware');
const todoRoutes = require('./routes/todos.routes');

const app = express();
const PORT = 3000;

// App-level Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Route-level Middleware
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});