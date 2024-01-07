// import { connectToDB } from "../database";
// import Product from "../database/models/product.model";
// import { scrapeAmazonProduct } from "../scrape";
// import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

import { connectToDB } from "../database";
import Product from "../database/models/product.model";

// export async function scrapeAndStoreProduct(productUrl: string) {
//     if (!productUrl) return;

//     try {
//         connectToDB();

//         const scrapedProduct = await scrapeAmazonProduct(productUrl);

//         if (!scrapedProduct) return;

//         let product = scrapedProduct;

//         const existingProduct = await Product.findOne({ url: scrapedProduct.url });

//         if (existingProduct) {
//             const updatedPriceHistory: any = [
//                 ...existingProduct.priceHistory,
//                 { price: scrapedProduct.currentPrice }
//             ]

//             product = {
//                 ...scrapedProduct,
//                 priceHistory: updatedPriceHistory,
//                 lowestPrice: getLowestPrice(updatedPriceHistory),
//                 highestPrice: getHighestPrice(updatedPriceHistory),
//                 averagePrice: getAveragePrice(updatedPriceHistory),
//             }
//         }

//         const newProduct = await Product.findOneAndUpdate(
//             { url: scrapedProduct.url },
//             product,
//             { upsert: true, new: true }
//         );
//     } catch (error: any) {
//         throw new Error(`Failed to create/update product: ${error.message}`)
//     }
// }

// export async function getProductById(productId: string) {
//     try {
//         connectToDB();

//         const product = await Product.findOne({ _id: productId });

//         if (!product) return null;

//         return product;
//     } catch (error) {
//         console.log(error);
//     }
// }

export async function getAllProducts() {
    try {
        connectToDB();

        const products = await Product.find();

        return products;
    } catch (error) {
        console.log(error);
    }
}
