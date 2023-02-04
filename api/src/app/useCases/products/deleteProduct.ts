import { Request, Response } from 'express';
import { Product } from '../../models/Product';
import { io } from '../../..';

//req possui as informações enviadas para a requisição
export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    const products = await Product.find();
    io.emit('deleted@product', products);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}