import { Ingredient, ProductItem } from "@prisma/client"
import { PizzaSize, PizzaType } from "../constants/pizza"

/**
 * Функция для расчета общей стоимости пиццы
 * @example ```calcTotalPizzaPrice(1, 20, items, ingredients, selectedIngredients)```
 * 
 * @param type - тип теста
 * @param size - размер пиццы
 * @param items -вариации пиццы
 * @param ingredients - ингредиенты
 * @param selectedIngredients -выбранные ингредиенты
 * 
 * @returns цена
 */

export const calcTotalPizzaPrice = (type:PizzaType, size:PizzaSize, items:ProductItem[], ingredients:Ingredient[], selectedIngredients: Set<number> ) => {

    const pizzaPrice = items.find((item) => item.pizzaType === type && item.pizzaSize === size)?.price || 0
    const totalIngredientsPrice = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).reduce((a, b) => a + b.price, 0)
    
    return pizzaPrice + totalIngredientsPrice
}