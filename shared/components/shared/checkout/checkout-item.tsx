'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from '../cart-item-details/cart-item-details.types';
import * as CartItemDetails from '../cart-item-details';
import { CountButtonProps } from '../count-button';

interface Props extends CartItemProps {
    onClickCountButton: (type: 'plus' | 'minus') => void
    onClickRemove: () => void
    className?: string
}

export const CheckoutItem: React.FC<Props> = ({
    name,
    price,
    imageUrl,
    details,
    disabled,
    quantity,
    className,
    onClickCountButton,
    onClickRemove,
}) => {
    return (
        <div className={cn('items-center justify-between bg-secondary p-3 rounded-md', disabled && 'opacity-50 pointer-events-none', className)}>
            <div className="flex flex-wrap justify-items-center gap-3 text-left">
                <CartItemDetails.Image src={imageUrl} />
                <CartItemDetails.Info name={name} details={details} />
            </div>


            <div className="flex justify-between">
                <CartItemDetails.Price value={price} />
                <div className="flex items-center">
                    <CartItemDetails.CountButton className='mr-2' onClick={onClickCountButton} value={quantity} />
                    <button type='button' onClick={onClickRemove}>
                        <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
