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

const getAllOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const filterEmail = req.query.email as string | undefined;

    if (filterEmail && typeof filterEmail === "string") {
      const result = await OrdersServices.getOrderFromDBByEmail(filterEmail);
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
    } else {
      const result = await OrdersServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const ordersController = {
  createOrder,
  getAllOrders,
};