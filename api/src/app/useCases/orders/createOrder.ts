import { Request, Response } from 'express';
import { io } from '../../..';
import { Order } from '../../models/Order';

//req possui as informações enviadas para a requisição
export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;
    const order = await Order.create({ table, products });
    const orderDetails = await order.populate('products.product');

    io.emit('orders@new', orderDetails);
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}