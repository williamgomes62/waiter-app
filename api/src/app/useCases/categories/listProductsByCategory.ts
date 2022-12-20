import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const products = await Product.find();

    //Ajustar a query depois
    const result = products.filter(p => p.category.toString() === categoryId);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}