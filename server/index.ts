import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './lib/database';
import { scrapeAmazonProduct } from './lib/scrape';

dotenv.config({ path: '../.env' })
export const app = express();
const port = 3000;

// Enable CORS
app.use(cors());


// Connect to MongoDB
connectToDB()

// proxy route
app.use('/api', async (req: Request, res: Response) => {
  try {
    const url = String(req.query.url); // Pass the URL as a query parameter

    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    const data = await scrapeAmazonProduct(url, req, res)
    console.log(data)
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
