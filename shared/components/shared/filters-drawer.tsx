'use client'

interface Props {
    className?: string
}

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/shared/components/ui/sheet";
import { cn } from '@/shared/lib/utils'
import { useCartStore } from '@/shared/store/cart';
import React from 'react';
import { Filters } from "./filters";

export const FiltersDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    const [totalAmount, fetchCartItems, updateItemQuantity, removeCartItem, items] = useCartStore(state => [
        state.totalAmount,

        state.fetchCartItems,
        state.updateItemQuantity,
        state.removeCartItem,
        state.items
    ])

    React.useEffect(() => {
        fetchCartItems()
    }, [fetchCartItems])

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        updateItemQuantity(id, type === 'plus' ? quantity + 1 : quantity - 1)
    }

    return (
        <div className={cn('', className)}>
            <Sheet>
                <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent  side={'left'} aria-describedby={undefined} className='flex flex-col w-screen justify-between px-2 bg-background'>
                    {/* Drawer Items */}
                    <div className="overflow-auto pr-2 mt-4 scrollbar">
                        <Filters className="border-none bg-transparent" />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}