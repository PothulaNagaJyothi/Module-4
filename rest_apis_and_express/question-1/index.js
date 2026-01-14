const express = require('express');
const app = express();
const PORT = 3000;

// /home route
app.get('/home', (req, res) => {
    res.json({ message: "This is home page" });
});

// /contactus route
app.get('/contactus', (req, res) => {
    res.json({ 
        email: "contact@contact.com",
        message: "Contact us anytime!" 
    });
});

// Bonus Task: /about route
app.get('/about', (req, res) => {
    res.json({ message: "Welcome to the About page!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});