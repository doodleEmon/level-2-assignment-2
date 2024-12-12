import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: Product) => {
    const response = await ProductModel.create(product);
    return response;
};

export const ProductServices = {
  createProductIntoDB,
};
