'use client'

import { cn } from '@/shared/lib/utils'
import { CheckboxFiltersGroup, Title } from '.'
import { Button, Input, RangeSlider } from '../ui'
import React from 'react'
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks'


interface Props {
    className?: string
}


export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngredients()
    const filters = useFilters()

    const updatePrices = (values: number[]) => {
        filters.setPrices('priceFrom', values[0])
        filters.setPrices('priceTo', values[1])
    }

    useQueryFilters(filters)

    const items = ingredients.map((item) => ({ text: item.name, value: String(item.id) }))

    return (
        <div className={cn('bg-card rounded-xl p-5', className)}>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
            {/* Top checkboxes */}
            <CheckboxFiltersGroup
                title='Тесто'
                name='sizes'
                className='mb-5'
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' },
                ]}
                selected={filters.pizzaTypes}
                onClickChekbox={filters.setPizzaTypes}
            />

            <CheckboxFiltersGroup
                title='Размеры'
                name='sizes'
                className='mb-5'
                items={[
                    { text: 'Маленькие', value: '20' },
                    { text: 'Средние', value: '30' },
                    { text: 'Большие', value: '40' },
                ]}
                selected={filters.sizes}
                onClickChekbox={filters.setSizes}
            />
            {/* Coast filter */}
            <div className='mt-5 border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Цена от и до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input className='bg-secondary' type='number' min={0} max={1000} value={String(filters.prices.priceFrom) || 0} onChange={(e) => { filters.setPrices('priceFrom', Number(e.target.value)) }} placeholder='0' />
                    <Input className='bg-secondary' type='number' min={100} max={1000} value={String(filters.prices.priceTo) || 1000} onChange={(e) => { filters.setPrices('priceTo', Number(e.target.value)) }} placeholder='1000' />
                </div>
                <RangeSlider className='ml-30' min={0} max={1000} step={10} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
                    onValueChange={updatePrices} />
            </div>

            {/* Ingredients */}
            <CheckboxFiltersGroup
                title='Ингредиенты'
                name='ingredients'
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickChekbox={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
            />

            <Button className='w-full h-10 mt-3 text-lg' onClick={() => filters.resetFilters()}>Сбросить</Button>
        </div>
    )
}