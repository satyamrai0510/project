const express = require('express');
const path = require('path');
const axios = require('axios'); // Add axios for API calls

const app = express();
const PORT = 3000;

// Middleware to serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle login form submission
app.post('/login', async (req, res) => {
  const { name } = req.body;

  try {
    // Call the Agify API to get the predicted age
    const response = await axios.get(`https://api.agify.io?name=${name}`);
    const age = response.data.age;

    // Redirect to the welcome page with name and age
    res.redirect(`/welcome?name=${name}&age=${age}`);
  } catch (error) {
    console.error('Error calling Agify API:', error);
    res.status(500).send('Error fetching age data');
  }
});

// Serve the welcome page
app.get('/welcome', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'welcome.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});