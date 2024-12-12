import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: Product) => {
  const response = await ProductModel.create(product);
  return response;
};

const getAllProductsFromDB = async () => {
  const response = await ProductModel.find();
  return response;
};

const getAProductFromDB = async (id: string) => {
  const response = await ProductModel.findOne({ _id: id });
  return response;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getAProductFromDB,
};
