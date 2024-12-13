import { Request, Response } from "express";
import { OrdersServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrdersServices.createOrderIntoDB(order);
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ordersController = {
  createOrder,
};
