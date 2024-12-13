import { z } from "zod";

export const variantZodSchema = z.object({
  type: z.string().min(1, { message: "Variant type is required" }),
  value: z.string().min(1, { message: "Variant value is required" }),
});

export const inventoryZodSchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative({ message: "Quantity must be a non-negative integer" }),
  inStock: z.boolean({ message: "InStock must be a boolean value" }),
});

const productZodSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Category is required" }),
  tags: z
    .array(z.string().min(1, { message: "Tag must be a non-empty string" }))
    .nonempty({ message: "At least one tag is required" }),
  variants: z
    .array(variantZodSchema)
    .nonempty({ message: "At least one variant is required" }),
  inventory: inventoryZodSchema,
});

export default productZodSchema;
