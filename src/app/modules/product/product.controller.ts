import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await ProductServices.createProductIntoDB(product);
    res.status(200).json({
      success: true,
      message: "Product is created successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productControllers = {
  createProduct,
};
