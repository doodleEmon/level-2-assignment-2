import express from "express";
import { productControllers } from "./product.controller";

const router = express.Router();

router.post("/", productControllers.createProduct);

router.get("/", productControllers.getAllProducts);

router.get("/:productId", productControllers.getSingleProduct);

router.put("/:productId", productControllers.updateSingleProduct);

export const ProductRoutes = router;
