'use client'

import { cn } from '@/shared/lib/utils'
import { PizzaImage } from './pizza-image'
import { GroupVariants, IngredientItem, Title } from '.'
import { Button } from '../ui'
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza'
import { Ingredient } from '@prisma/client'
import { Iproduct } from '@/@types/prisma'
import React from 'react'
import { calcTotalPizzaPrice } from '@/shared/lib/calc-total-pizza-price'
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options'

interface Props {
    imageUrl: string
    name: string
    ingredients: Ingredient[]
    items: Iproduct['items']
    onSubmit: (itemId: number, ingredients: number[]) => void
    loading?: boolean
    isModal?: boolean
    className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({ imageUrl, name, ingredients, items, onSubmit, className, loading, isModal }) => {
    const { addIngredient, selectedIngredients, setSize, setType, size, type, avalablePizzas, currentItemId } = usePizzaOptions(items)

    const textDetaills = `${size} см, ${mapPizzaType[type]} тесто`
    const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients)

    const handleClickAdd = () => {
        if(currentItemId){
            onSubmit(currentItemId, Array.from(selectedIngredients));
        }
    }

    return (
        <div className={cn('flex flex-wrap justify-center', className)}>
            <PizzaImage imageUrl={imageUrl} size={size} alt={name} />

            <div className="sm:w-[490px] bg-background pt-3">
                <div className={cn('max-h-[500px] overflow-auto scrollbar md:pr-1 ')}>
                    <div className=''>
                        <Title text={name} size='md' className="font-extrabold mb-1" />

                        <p className="text-gray-400">{textDetaills}</p>

                        <GroupVariants items={avalablePizzas} defaultValue={size} selectedValue={String(size)} onClik={value => setSize(Number(value) as PizzaSize)} />
                        <GroupVariants items={pizzaTypes} defaultValue={type} selectedValue={String(type)} onClik={value => setType(Number(value) as PizzaType)} />
                    </div>


                    <div className={cn(isModal ? '' : 'max-h-[320px] overflow-auto scrollbar' , 'bg-background sm:py-2 rounded-md grid grid-cols-2 sm:grid-cols-3 gap-y-2 ')}>
                        {
                            ingredients.map((ingredient) => (
                                <IngredientItem
                                    key={ingredient.id}
                                    imageUrl={ingredient.imageUrl}
                                    name={ingredient.name}
                                    price={ingredient.price}
                                    active={selectedIngredients.has(ingredient.id)}
                                    onClick={() => addIngredient(ingredient.id)}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className='pt-2 flex'>
                    <Button loading={loading} onClick={handleClickAdd} className='h-[55px] text-base font-semibold rounded-full w-full'>
                        В корзину за {totalPrice}₽
                    </Button>
                </div>


            </div>
        </div>
    )
}