import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.routes";
import { OrderRoutes } from "./app/modules/order/order.routes";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found!" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
