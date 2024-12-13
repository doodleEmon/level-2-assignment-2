import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (order: Order) => {
  const res = await OrderModel.create(order);
  return res;
};

export const OrdersServices = {
  createOrderIntoDB,
};
