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

const getSingleProductFromDB = async (id: string) => {
  const response = await ProductModel.findOne({ _id: id });
  return response;
};

const updateSingleProductIntoDB = async (id: string, updatedData: Product) => {
  const res = await ProductModel.updateOne({ _id: id }, { $set: updatedData }); //pick document by id and set updated data
  return res;
};

const deleteSingleProductFromDB = async (id: string) => {
  const res = await ProductModel.deleteOne({ _id: id });
  return res;
};

const searchProductsFromDB = async (searchTerm: string) => {
  const searchRegex = new RegExp(searchTerm, "i");

  const result = await ProductModel.find({
    $or: [
      { name: searchRegex },
      { description: searchRegex },
      { category: searchRegex },
      { tags: { $in: [searchRegex] } },
      { "variants.value": searchRegex },
      { "variants.type": searchRegex },
    ],
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductFromDB,
  searchProductsFromDB,
};
