'use client'

import { cn } from '@/shared/lib/utils'
import * as CartItem from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CountButton } from './count-button'
import { Trash2Icon } from 'lucide-react'

interface Props extends CartItemProps {
    onClickCountButton: (type: 'plus' | 'minus') => void
    onClickRemove: () => void
    className?: string
}

export const CartDrawerItem: React.FC<Props> = ({ className, disabled, imageUrl, details, name, price, quantity, onClickCountButton, onClickRemove }) => {
    return (
        <div className={cn('flex bg-secondary rounded-xl p-3 mx-2 gap-6', disabled && 'opacity-50 pointer-events-none' , className)}>
            <CartItem.Image className='w-24 h-24' src={imageUrl} />

            <div className='flex-1'>
                <CartItem.Info name={name} details={details} />
                <hr className='my-3' />

                <div className='flex items-center justify-between'>
                    <CountButton value={quantity} onClick={onClickCountButton} />

                    <div className='flex items-center gap-3'>
                        <CartItem.Price value={price} />
                        <Trash2Icon onClick={onClickRemove} className='text-gray-400 cursor-pointer hover:text-gray-600' size={16} />
                    </div>
                </div>
            </div>


        </div>
    )
}