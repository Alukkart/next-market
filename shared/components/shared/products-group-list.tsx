'use client'

import React from 'react';
import { cn } from '@/shared/lib/utils'
import { ProductCard, Title } from '.';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import { Iproduct } from '@/@types/prisma';

interface Props {
    title: string;
    items: Iproduct[];
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ className, listClassName, title, items, categoryId }) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const intersectionRef = React.useRef(null)
    const intersection = useIntersection(intersectionRef, {
        threshold: [0.25, 0.5, 0.75, 1]
    });

    React.useEffect(() => {
        if (intersection && intersection.isIntersecting) {
            setActiveCategoryId(categoryId)
        }
    }, [categoryId, intersection, intersection?.isIntersecting, setActiveCategoryId, title])

    return (
        <div className={cn('', className)} id={title} ref={intersectionRef}>
            <Title text={title} size='lg' className='mb-5 font-extrabold' />

            <div className={cn('grid md:grid-cols-2 desktop:grid-cols-3 gap-[50px]', listClassName)}>
                {
                    items.map((item, index) => (
                        <ProductCard
                            key={index}
                            id={item.id}
                            name={item.name}
                            price={item.items[0].price}
                            imageUrl={item.imageUrl}
                            ingredients={item.ingredients}
                        />
                    ))
                }
            </div>
        </div>
    )
}