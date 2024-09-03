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
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemsDetails } from '@/shared/lib/get-cart-items-details';
import React from 'react';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import Image from "next/image";
import { Title } from "./title";
import { useCart } from "@/shared/hooks";

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart()
    const [redirecting, setRedirecting] = React.useState(false)

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        updateItemQuantity(id, type === 'plus' ? quantity + 1 : quantity - 1)
    }

    return (
        <div className={cn('', className)}>
            <Sheet>
                <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent aria-describedby={undefined} className='flex border-none flex-col w-screen justify-between pb-0 bg-background'>
                    <div className={cn('flex flex-col h-full', !totalAmount && 'items-center justify-center')}>
                        {
                            totalAmount > 0 && items.length > 0 && (
                                <SheetHeader>
                                    <SheetTitle className='text-2xl'>{items.length} {items.length === 1 ? 'товар' : 'товара'} на {totalAmount}₽</SheetTitle>
                                </SheetHeader>
                            )
                        }

                        {!totalAmount && (
                            <div className="flex flex-col items-center justify-center w-60 mx-auto">
                                <Image src="/empty-box.png" width={120} height={120} alt="Empty cart" />
                                <Title size="sm" text="Корзина пуста" className="text-center font-bold my-2" />
                                <p className="text-center ">
                                    Добавьте понравившийся товар в корзину чтобы совершить заказ.
                                </p>

                                <SheetClose>
                                    <Button className="w-56 h-12 mt-5 px-7" size={'lg'}>
                                        <ArrowLeft size={64} />
                                        Вернуться к покупкам
                                    </Button>
                                </SheetClose>
                            </div>
                        )}

                        {/* Drawer Items */}
                        {
                            totalAmount > 0 && items.length > 0 && (
                                <>
                                    <div className='-mx-6 mt-5 scrollbar overflow-auto flex-1'>
                                        {
                                            items.map(item => (
                                                <div className='mb-2' key={item.id}>
                                                    <CartDrawerItem
                                                        onClickRemove={() => removeCartItem(item.id)}
                                                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                                        details={getCartItemsDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                                                        key={item.id}
                                                        name={item.name}
                                                        quantity={item.quantity}
                                                        price={item.price}
                                                        disabled={item.disabled}
                                                        imageUrl={item.imageUrl} />
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <SheetFooter className='-mx-6 bg-background p-8'>
                                        <div className='w-full'>
                                            <div className='flex mb-4 font-bold'>
                                                <span className='flex flex-1'>
                                                    Сумма заказа
                                                </span>

                                                <span>{totalAmount}₽</span>
                                            </div>

                                            <Link href={'/checkout'}>
                                                <Button
                                                    onClick={() => setRedirecting(true)}
                                                    loading={redirecting}
                                                    type='submit'

                                                    className='w-full  h-12 text-base rounded-full'>
                                                    К оформлению заказа
                                                    <ArrowRight className='ml-2' width={20} height={20} />
                                                </Button>
                                            </Link>

                                        </div>
                                        {/* TODO кнопка очистки корзины */}
                                    </SheetFooter>
                                </>
                            )
                        }
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}