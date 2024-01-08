import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './lib/database';
import { scrapeAmazonProduct } from './lib/scrape';
import Product from './lib/database/models/product.model';
import { getAveragePrice, getHighestPrice, getLowestPrice } from './lib/utils';
import { getAllProducts } from './lib/controllers/productController';

dotenv.config({ path: '../.env' })
export const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Connect to MongoDB
connectToDB();

app.get('/api/products', getAllProducts);


// proxy route
app.use('/api', async (req: Request, res: Response) => {

  try {
    const url = String(req.query.url); // Pass the URL as a query parameter

    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    // if (req.url === '/products') {
    //   try {
    //     const response = await getAllProducts;
    //     res.json(response);

    //     console.log('Response Successed')
    //   } catch (error: any) {
    //     res.json(error);
    //     console.log('Response Faild')
    //   }
    // }

    // console.log('Received request:', req.url)

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
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProudct.url },
      product,
      { upsert: true, new: true }
    );
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// const router = express.Router()

// Check this: https://github.com/elibolonur/ts-express-vue3/blob/main/server/app.ts
// app.use('/products', getAllProducts)

// app.use('/products', (req, res) => {
//   const data = createSSRApp({
//     data: () => getAllProducts,
//   });
//   res.send(data)
// });

// const router = express.Router();

// // This router if to get all of the posts (SELECT *)
// app.use("/products", async (req: Request, res: Response) => {
//   console.log('get it ')
//   // try {
//   //   const response = await getAllProducts;
//   //   res.json(response);

//   //   console.log('Response Successed')
//   // } catch (error: any) {
//   //   res.json(error);
//   //   console.log('Response Faild')
//   // }
// });


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
