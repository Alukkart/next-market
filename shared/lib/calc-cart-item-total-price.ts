import { CartDTO, CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO):number => {
    const ingredientsPrice = item.ingredients.reduce((a, b) => a + b.price, 0)
    return (item.productItem.price + ingredientsPrice) * item.quantity
}