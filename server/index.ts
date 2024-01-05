import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' })
const app = express();
const port = 3000; // Adjust the port as needed

// Enable CORS
app.use(cors());


// Connect to MongoDB
let isConnected = false;// Variable to track the connection status

const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.VITE_MONGODB_URI) return console.log('MONGODB_URI is not defined');

  if (isConnected) return console.log('=> using existing database connection');

  try {
    await mongoose.connect(process.env.VITE_MONGODB_URI);

    isConnected = true;

    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error)
  }
}

connectToDB()

// proxy route
app.use('/api', async (req: Request, res: Response) => {
  try {
    const url = String(req.query.url); // Assuming you pass the URL as a query parameter

    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    // Config bright data proxy
    const username = process.env.VITE_BRIGHT_DATA_USERNAME;
    const password = process.env.VITE_BRIGHT_DATA_PASSWORD;;
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options: any = {
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
    console.log(brightDataResponse.data)
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
