import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType, pizzaTypes } from "../constants/pizza";

export const getAvaliablePizzaSizes = (type: PizzaType, items: ProductItem[]) => {
    const felteredPizzasByTitle = items.filter((item) => item.pizzaType === type)

    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !felteredPizzasByTitle.some((pizza) => pizza.pizzaSize === Number(item.value))
    }))
}
