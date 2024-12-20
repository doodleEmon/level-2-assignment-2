import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productZodSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const parsedData = productZodSchema.parse(product);
    const result = await ProductServices.createProductIntoDB(parsedData);
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;
    if (searchTerm && typeof searchTerm === "string") {
      const result = await ProductServices.searchProductsFromDB(searchTerm);
      return res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    }
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const parsedData = productZodSchema.parse(updatedData);
    const result = await ProductServices.updateSingleProductIntoDB(
      productId,
      parsedData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
