const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests from your frontend
app.use(bodyParser.json()); // Parse JSON request bodies

// --- Mock Database (In a real app, use PostgreSQL, MongoDB, etc.) ---
const users = [
  { id: 1, username: 'user1', password: 'password123', earnings: 10.50 },
  { id: 2, username: 'DemoUser', password: 'password', earnings: 0.00 } // Pre-registered for testing
];
// --- End Mock Database ---

// --- Simple Token Generation (In a real app, use JWT) ---
const generateToken = (user) => {
  // In a real app, this would be a cryptographically secure JWT
  return `mock_jwt_for_${user.username}_${Date.now()}`;
};
// --- End Simple Token Generation ---

// API Routes

// Register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password, // In real app, HASH this password!
    earnings: 0.00
  };
  users.push(newUser);
  res.status(201).json({ message: 'Registration successful! You can now log in.', username: newUser.username, earnings: newUser.earnings });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password); // In real app, compare HASHED passwords!

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = generateToken(user);
  res.json({ message: 'Login successful!', username: user.username, earnings: user.earnings, token });
});

// Securely update earnings (requires authentication in real app)
app.post('/api/update-earnings', (req, res) => {
  // In a real app, you'd verify the user's token here
  // and ensure the earning update request is legitimate (e.g., came after a verified ad view).

  const { username, amount } = req.body;
  const user = users.find(u => u.username === username); // Get user by ID from token in real app

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.earnings += parseFloat(amount); // Ensure amount is a number
  console.log(`Updated earnings for ${username}. New earnings: ${user.earnings.toFixed(2)}`);
  res.json({ message: 'Earnings updated successfully!', newEarnings: user.earnings });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
