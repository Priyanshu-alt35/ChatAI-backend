const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRoute = require('./routes/chat');

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/chat', chatRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ ChatAI backend running on port ${PORT}`);
});
