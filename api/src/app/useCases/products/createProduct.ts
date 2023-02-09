import { Request, Response } from 'express';
import { Product } from '../../models/Product';
import { io } from '../../..';
import { convertImageUrlToBase64 } from '../../../utils/imageConversion';

//req possui as informações enviadas para a requisição
export async function createProduct(req: Request, res: Response) {
  //req.file tras as informações sobre o arquivo
  try {
    const imagePath = convertImageUrlToBase64(req.file!.path);
    const { name, description, price, category, ingredients } = req.body;

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });
    io.emit('created@product', product);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}