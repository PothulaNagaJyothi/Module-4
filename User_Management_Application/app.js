const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Main Route
app.use('/api/users', userRoutes);

// 404 Handler
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));