const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');  // Add this to use 'path' module

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'autozaries'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the homepage.html on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'homepage.html'));  // Serve the HTML file
});

// Handle user registration (POST /registration)
app.post('/registration', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  // Register user logic here...
});

// Handle login (POST /login)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  // Authenticate user logic here...
});

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
