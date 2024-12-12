import express from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.router";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoutes);

export default app;
