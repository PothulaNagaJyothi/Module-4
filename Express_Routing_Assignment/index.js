const express = require('express');
const userRouter = require('./routes/users.routes');
const todoRouter = require('./routes/todos.routes');

const app = express();
const PORT = 3000;


app.use(express.json());


app.use('/users', userRouter);
app.use('/todos', todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});