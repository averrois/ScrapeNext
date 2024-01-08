import { Request, Response } from 'express';
import Product from "../database/models/product.model";

export async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching products');
    }
}

export async function getProductById(productId: string) {
    try {
        const product = await Product.findOne({ _id: productId });

        if (!product) return null;

        return product;
    } catch (error) {
        console.log(error);
    }
}
