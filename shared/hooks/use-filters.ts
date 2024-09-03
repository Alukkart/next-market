import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { useSet } from "react-use";

interface PriceProps {
    priceFrom?: number
    priceTo?: number
}

interface QueryFilters extends PriceProps{
    pizzaTypes: string
    sizes: string
    ingredients: string
}

interface ReturnProps {
    selectedIngredients: Set<string>
    sizes: Set<string>
    pizzaTypes: Set<string>
    prices: PriceProps
}

export interface Filters {
    selectedIngredients: Set<string>
    sizes: Set<string>
    pizzaTypes: Set<string>
    prices: PriceProps
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void
    setPizzaTypes: (value: string) => void
    setSizes: (value: string) => void
    setSelectedIngredients: (value: string) => void
    resetFilters: () => void
}

export const useFilters = ():ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof QueryFilters,
        string
    >;

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get('ingredients')?.split(',')),
    );

    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []),

    );

    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(
            searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
        )
    )

    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const resetFilters = () => {
        setPrices({priceFrom: undefined, priceTo: undefined})
        selectedIngredients.forEach((item) => toggleIngredients(String(item)))
        sizes.forEach((item) => toggleSizes(String(item)))
        pizzaTypes.forEach((item) => togglePizzaTypes(String(item)))
    }

    return useMemo(
        () => (
            {
                prices,
                sizes,
                pizzaTypes,
                selectedIngredients,
                setSelectedIngredients: toggleIngredients,
                setPrices: updatePrice,
                setPizzaTypes: togglePizzaTypes,
                setSizes: toggleSizes,
                resetFilters
            }
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [prices, sizes, pizzaTypes, selectedIngredients]
    )
;

}
