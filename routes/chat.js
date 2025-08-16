const express = require('express');
const axios = require('axios');

const router = express.Router();

// POST / (AI response route)
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string.' });
    }

   const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.AI_API_KEY}`,
  {
    contents: [
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ]
  },
  {
    headers: { 'Content-Type': 'application/json' }
  }
);


    const aiReply =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      '⚠ Gemini did not return a valid response.';

    return res.json({ reply: aiReply });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to get AI response.' });
  }
});

module.exports = router;
