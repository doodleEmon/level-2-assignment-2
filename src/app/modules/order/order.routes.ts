import express from "express";
import { ordersController } from "./order.controller";

const router = express.Router();

router.post("/", ordersController.createOrder);

export const OrderRoutes = router;
