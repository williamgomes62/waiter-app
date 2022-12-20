import { Request, Response } from 'express';
import { Order } from '../../models/Order';

//req possui as informações enviadas para a requisição
export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      return res.status(400).json({
        error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE.',
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });
    res.sendStatus(204); // mensagem de sucesso sem conteúdo
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}