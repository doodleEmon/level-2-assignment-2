import { ProductModel } from "../product/product.model";
import { ProductServices } from "../product/product.service";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (order: Order) => {
  const { productId } = order;
  const product = await ProductServices.getSingleProductFromDB(productId);
  if (
    product &&
    product.inventory.quantity > 0 &&
    order.quantity <= product.inventory.quantity
  ) {
    const res = await OrderModel.create(order);
    const restProductQuantity = product.inventory.quantity - order.quantity;
    if (restProductQuantity === 0) {
      await ProductModel.updateOne(
        { _id: productId },
        {
          $set: {
            "inventory.inStock": false,
            "inventory.quantity": restProductQuantity,
          },
        }
      );
    } else {
      await ProductModel.updateOne(
        { _id: productId },
        { $set: { "inventory.quantity": restProductQuantity } }
      );
    }
    return res;
  } else {
    return null;
  }
};

const getAllOrdersFromDB = async () => {
  const res = await OrderModel.find();
  return res;
};

const getOrderFromDBByEmail = async (email: string) => {
  const res = await OrderModel.find({ email: email });
  console.log("🚀 ~ getOrderFromDBByEmail ~ res:", res);
  if (res.length === 0) {
    return null;
  } else {
    return res;
  }
};

export const OrdersServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrderFromDBByEmail,
};
