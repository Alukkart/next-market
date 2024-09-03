'use client'

import { Iproduct } from '@/@types/prisma'
import { cn } from '@/shared/lib/utils'
import { useCartStore } from '@/shared/store/cart'
import router from 'next/router'
import toast from 'react-hot-toast'
import { ChoosePizzaForm, ChooseProductForm } from '.'

interface Props{
    product: Iproduct
    _onSubmit?: () => void
    className?:string
}

export const ProductForm: React.FC<Props> = ({ product, _onSubmit }) => {
    const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading])

    const firstItem = product.items[0]
    const isPizzaForm = Boolean(firstItem.pizzaType)

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id

            await addCartItem({
                productItemId: itemId,
                ingredientsIds: ingredients
            })

            toast.success('Товар добавлен в корзину')
            _onSubmit?.()
        } catch (error) {
            console.error(error)
            toast.error('Произошла ошибка при добавлении товара в корзину')
        }
    }


    if(isPizzaForm){
        return (
            <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            loading={loading}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}/>
        )
    }

    return (
        <ChooseProductForm
        imageUrl={product.imageUrl}
        name={product.name}
        loading={loading}
        price={firstItem.price}
        onSubmit={onSubmit}/>
    )
}