import { Request, Response } from 'express';
import { Product } from '../../models/Product';
import { io } from '../../..';
import fs from 'fs';

//req possui as informações enviadas para a requisição
export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // Deletando a imgem do produto removido
    fs.unlink(`./uploads/${deletedProduct?.imagePath}`, (err) => {
      console.log('ERRO: ', err);
    });
    const products = await Product.find();
    io.emit('deleted@product', products);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}