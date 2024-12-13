import express from "express";
import { ordersController } from "./order.controller";

const router = express.Router();

router.post("/", ordersController.createOrder);

router.get("/", ordersController.getAllOrders);

export const OrderRoutes = router;
