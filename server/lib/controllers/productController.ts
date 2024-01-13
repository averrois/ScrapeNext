import { Request, Response } from 'express';
import Product from "../database/models/product.model";
import { User } from '../types';

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

export async function addUserEmailToProduct(productId: string, userEmail: string) {
    try {
        const product = await Product.findById(productId);

        if (!product) return;

        const userExists = product.users.some((user: User) => user.email === userEmail);

        if (!userExists) {
            product.users.push({ email: userEmail });

            await product.save();
        }
    } catch (error: any) {
        console.log(error);
    }
}
