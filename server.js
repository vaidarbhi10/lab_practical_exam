const express = require('express');

// ✅ FIXED PATH (important)
const studentRoutes = require('./src/routes/students');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/students', studentRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Student API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});