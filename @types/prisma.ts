import { Ingredient, Product, ProductItem } from "@prisma/client";

export type Iproduct = Product & { items: ProductItem[]; ingredients: Ingredient[]}
