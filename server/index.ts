import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import { extractCurrency, extractPrice } from "./lib/utils"

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

    // Handle the response as needed

    // Initialize Cheerio
    const $ = cheerio.load(brightDataResponse.data)

    // Extract product title
    const title = $('#productTitle').text().trim()

    // Extract product current price (discount)
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
    )

    // // Extract original
    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    )

    // Extract if the product is out of stack
    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable'

    // Extract images & oarsing them
    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}'

    const imageUrls = Object.keys(JSON.parse(images))

    // Extract currency 
    const currency = extractCurrency($('.a-price-symbol'))

    // Extract discount percentage
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "")

    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      isOutOfStock: outOfStock,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
      // Other elements to add letter on
      category: 'category',
      reviewsCount: 10,
      stars: 3,
    }

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
