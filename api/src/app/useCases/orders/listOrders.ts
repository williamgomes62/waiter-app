import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ cretedAt: 1 }) // ordena pela ordem de criação dos pedidos
      .populate('products.product');
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}