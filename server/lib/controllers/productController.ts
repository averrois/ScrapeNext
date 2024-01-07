import { Request, Response } from 'express';
import Product from "../database/models/product.model";

export async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await Product.find();
        res.json(products);

        console.log(products)
    } catch (error: any) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error fetching products', details: error.message });
    }
}
