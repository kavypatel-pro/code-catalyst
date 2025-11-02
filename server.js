const express = require('express');
const cors = require('cors'); // To allow requests from your frontend
const app = express();
const port = 3000; // The port your server will run on

// Use middleware
app.use(cors()); // Allows your frontend to connect to this server
app.use(express.json()); // Allows the server to understand JSON data sent from the frontend

// --- Replace this with your actual MongoDB connection later ---
// This is a placeholder for your internship data from the database
const allInternships = [
    // ... Copy and paste the content of your internships.json file here for now
    { "id": 1, "title": "Software Development Intern", /* ... */ },
    { "id": 2, "title": "Data Analytics Intern", /* ... */ }
];
// -----------------------------------------------------------------

// Define an "API Endpoint" to get all internships
app.get('/api/internships', (req, res) => {
    res.json(allInternships); // Send the internships back as JSON data
});

// Define an API endpoint to save a user's profile
app.post('/api/profile', (req, res) => {
    const userProfile = req.body;
    console.log('Received user profile:', userProfile);
    // --- Here, you would save the userProfile to your MongoDB database ---
    res.status(201).json({ message: 'Profile received successfully!' });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});