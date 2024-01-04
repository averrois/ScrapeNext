// backend-server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000; // Adjust the port as needed

// Enable CORS
app.use(cors());

// Your proxy route
app.use('/api', async (req, res) => {
  try {
    const url = req.query.url; // Assuming you pass the URL as a query parameter

    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    // Config bright data proxy
    const username = 'YOUR_BRIGHT_DATA_USERNAME';
    const password = 'YOUR_BRIGHT_DATA_PASSWORD';
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
      auth: {
        username: `${username}-session-${session_id}`,
        password,
      },
      host: 'brd.superproxy.io',
      port,
      rejectUnauthorized: false,
    };

    const brightDataResponse = await axios.get(url, options);
    res.json(brightDataResponse.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
