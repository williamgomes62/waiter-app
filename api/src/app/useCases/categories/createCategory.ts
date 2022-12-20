import { Request, Response } from 'express';
import { Category } from '../../models/Category';

//req possui as informações enviadas para a requisição
export async function createCategory(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;
    const category = await Category.create({ icon, name });
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}