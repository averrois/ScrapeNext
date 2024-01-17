import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './lib/database';
import { scrapeAmazonProduct } from './lib/scrape';
import Product from './lib/database/models/product.model';
import { getAveragePrice, getHighestPrice, getLowestPrice } from './lib/utils';
import { addUserEmailToProduct, getAllProducts, getProductById } from './lib/controllers/productController';

dotenv.config({ path: '../.env' })
export const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Connect to MongoDB
connectToDB();

app.get('/api/products', getAllProducts);

app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: 'Missing product ID parameter' });
    }

    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // res.json(product);
    return res.status(200).json(product)
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/products/:id/:email', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const email = req.params.email;

    if (!productId || !email) {
      return res.status(400).json({ error: 'Missing an parameter' });
    }

    const data = await addUserEmailToProduct(productId, email);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// proxy route
app.use('/api', async (req: Request, res: Response) => {

  try {
    const url = String(req.query.url); // Pass the URL as a query parameter

    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    const scrapedProudct = await scrapeAmazonProduct(url, req, res);

    if (!scrapedProudct) return;

    let product = scrapedProudct;

    const existingProduct = await Product.findOne({ url: scrapedProudct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProudct.currentPrice }
      ]

      product = {
        ...scrapedProudct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      }

      await existingProduct.updateOne(product);

      // Return the existing product's _id
      return res.status(200).json({ _id: existingProduct._id });
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProudct.url },
      product,
      { upsert: true, new: true }
    );

    // Return the new product's _id
    return res.status(200).json({ _id: newProduct._id });
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
