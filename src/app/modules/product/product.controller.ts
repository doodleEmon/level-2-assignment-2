import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await ProductServices.createProductIntoDB(product);
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const result = await ProductServices.getAllProductsFromDB();
//     res.status(200).json({
//       success: true,
//       message: "Product fetched successfully!",
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  console.log(req.query);
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
    const result = await ProductServices.updateSingleProductIntoDB(
      productId,
      updatedData
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

// const searchProducts = async (req: Request, res: Response) => {
//   console.log(req.query);
//   try {
//     const searchTerm = req.query;
//     console.log(searchTerm);
//     if (!searchTerm || typeof searchTerm !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Search term is required and must be a string.",
//       });
//     }

//     const result = await ProductServices.searchProductsFromDB(searchTerm);
//     res.status(200).json({
//       success: true,
//       message: `Products matching search term '${searchTerm}' fetched successfully!`,
//       data: result,
//     });
//   } catch (error) {
//     const err = error as Error;
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to search products.",
//       error: err.message,
//     });
//   }
// };

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  //   searchProducts,
};
