import { cn } from '@/shared/lib/utils'
import { CheckoutBlock, CheckoutItem, CheckoutItemSceleton } from '..'
import { PizzaType, PizzaSize } from '@/shared/constants/pizza'
import { CartStateItem } from '@/shared/lib/get-cart-details'
import { getCartItemsDetails } from '@/shared/lib/get-cart-items-details'

interface Props {
    items: CartStateItem[]
    loading?: boolean
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
    removeCartItem: (id: number) => void
    className?: string
}

export const CheckoutCart: React.FC<Props> = ({ className, items, onClickCountButton, removeCartItem, loading }) => {

    return (
        <CheckoutBlock title='1. Корзина' className={cn('', className)}>
            <div className="flex flex-col gap-3">
                {loading && [...Array(4)].map((_, index) => <CheckoutItemSceleton key={index} />)} {/* TODO написать свой скелетон */}

                {items.map((item) => (
                    <CheckoutItem
                        key={item.id}
                        imageUrl={item.imageUrl}
                        details={getCartItemsDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                        name={item.name}
                        disabled={item.disabled}
                        onClickCountButton={(type) => { onClickCountButton(item.id, item.quantity, type) }}
                        onClickRemove={() => { removeCartItem(item.id) }}
                        price={item.price}
                        quantity={item.quantity} />
                ))}

            </div>
            {/* <CheckoutItemSceleton /> */}
        </CheckoutBlock>

    )
}