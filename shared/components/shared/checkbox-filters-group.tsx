'use client'

import { cn } from '@/shared/lib/utils'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';
import React from 'react';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onClickChekbox?: (id: string) => void;
    defaultValue?: string[];
    className?: string;
    loading?: boolean;
    selected?: Set<string>;
    name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
    {
        title,
        items,
        defaultItems,
        limit = 5,
        searchInputPlaceholder = 'Поиск...',
        onClickChekbox,
        defaultValue,
        selected,
        className,
        loading,
        name
    }
) => {
    const [showAll, setShowAll] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    if(loading){
        return <div className={cn('', className)}>
            <p className='font-bold mb-3'>{title}</p>

            {
                ...[...Array(limit)].map((_, index) => (
                    <Skeleton key={index} className='mb-4 h-6 rounded-[8px]'/>
                ))
            }
        </div>
    }

    const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items).slice(0, limit)

    return (
        <div className={cn('select-none', className)}>
            <p className='font-bold mb-3'>{title}</p>

            {
                showAll &&
                <div className='mb-5'>
                    <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} className='bg-secondary border-none' />
                </div>
            }


            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {
                    list.map((item, index) => (
                        <FilterCheckbox
                            key={index}
                            name={name}
                            text={item.text}
                            value={item.value}
                            endAdornment={item.endAdornment}
                            checked={selected?.has(item.value)}
                            onCheckedChange={() => { onClickChekbox?.(item.value) }}
                        />
                    ))
                }
            </div>
            {
                items.length > limit && (
                    <div className={showAll ? 'border-t border-t-secondary mt-4' : ''}>
                        <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
                            {showAll ? 'Скрыть' : '+ Показать все'}
                        </button>
                    </div>
                )
            }
        </div>
    )
}