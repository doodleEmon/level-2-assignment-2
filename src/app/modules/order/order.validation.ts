import { z } from "zod";

const OrderZodSchema = z.object({
  productId: z.string().min(1, { message: "Product ID is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  price: z.number().gt(0, { message: "Price must be greater than 0" }),
  quantity: z
    .number()
    .int()
    .gt(0, { message: "Quantity must be a positive integer" }),
});

export default OrderZodSchema;
