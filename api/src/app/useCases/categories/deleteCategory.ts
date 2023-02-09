import { Request, Response } from 'express';
import { io } from '../../..';
import { Category } from '../../models/Category';


//req possui as informações enviadas para a requisição
export async function deleteCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);

    const categories = await Category.find();
    io.emit('deleted@category', categories);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}