import React, { useState } from "react"
import { PizzaSize, PizzaType } from "../constants/pizza"
import { Variant } from "../components/shared/group-variants"
import { useSet } from "react-use"
import { ProductItem } from "@prisma/client"
import { getAvaliablePizzaSizes } from "../lib/get-avaliable-pizza-sizes"

interface ReturnProps {
    size: PizzaSize
    type: PizzaType
    selectedIngredients: Set<number>
    avalablePizzas: Variant[]
    currentItemId?: number
    setSize: (size: PizzaSize) => void
    setType: (type: PizzaType) => void
    addIngredient: (id: number) => void
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20)
    const [type, setType] = useState<PizzaType>(1)
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))

    const avalablePizzas = getAvaliablePizzaSizes(type, items)

    const currentItemId = items.find((item) => item.pizzaType === type && item.pizzaSize === size)?.id

    React.useEffect(() => {
        const isAvalableSize = avalablePizzas.find((item) => item.value == String(size) && !item.disabled) 
        const avalableSizes = avalablePizzas.find((item) => !item.disabled)

        if(avalableSizes && !isAvalableSize) {setSize(Number(avalableSizes.value) as PizzaSize); setType(items.find((item) => item.pizzaSize === Number(avalableSizes.value))?.pizzaType as PizzaType)}
    }, [type, avalablePizzas, size, items])

    return {
        size,
        type,
        selectedIngredients,
        avalablePizzas,
        setSize,
        setType,
        addIngredient,
        currentItemId
    }
}