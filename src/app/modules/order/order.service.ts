import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (order: Order) => {
  const res = await OrderModel.create(order);
  return res;
};

const getAllOrdersFromDB = async () => {
  const res = await OrderModel.find();
  return res;
};

export const OrdersServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
