'use client'

import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { SearchIcon } from 'lucide-react'
import Link from 'next/link';
import React, { useRef } from 'react'
import { useClickAway, useDebounce } from 'react-use';

interface Props {
    className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [focused, setFocused] = React.useState(false)
    const [products, setProducts] = React.useState<Product[]>([])
    const ref = useRef(null);

    useClickAway(ref, () => {
        setFocused(false)
    });

    useDebounce(() => {
        Api.products.search(searchQuery).then(items => setProducts(items))
    },
        250,
        [searchQuery])

    const onClickItem = () => {
        setFocused(false)
        setSearchQuery('')
    }

    return (
        <>
            {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}

            <div ref={ref} className={cn('relative flex rounded-2xl flex-1 -pr-3 md:h-11 z-30 border-none', className)}>
                <SearchIcon size={20} className='absolute top-1/2 translate-y-[-50%] left-3 text-gray-400' />
                <input
                    type="text"
                    placeholder="Найти пиццу..."
                    className='rounded-2xl w-full pl-11 outline-none bg-secondary'
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <div className='hidden sm:block'>
                    {
                        products.length > 0 &&
                        <div className={cn(
                            'absolute w-full left-0 bg-background rounded-xl py-2 top-20 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                            focused && 'visible opacity-100 top-12')}
                        >
                            {products.map((product) => (
                                <Link key={product.id} onClick={onClickItem} href={`/product/${product.id}`} className='rounded-xl flex items-center gap-3 w-full px-3 py-2 hover:bg-secondary/45'>
                                    <img draggable={false} className='rounded-sm' src={product.imageUrl} width={64} height={64} alt="" />
                                    <span>{product.name}</span>
                                </Link>
                            ))}
                        </div>
                    }
                </div>
            </div>
            <div className='block sm:hidden'>
                {
                    products.length > 0 &&
                    <div className={cn(
                        'absolute w-screen left-0 bg-background rounded-xl py-2 top-20 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                        focused && 'visible opacity-100 top-12')}
                    >
                        {products.map((product) => (
                            <Link key={product.id} onClick={onClickItem} href={`/product/${product.id}`} className='rounded-xl flex items-center gap-3 w-full px-3 py-2 hover:bg-secondary/45'>
                                <img draggable={false} className='rounded-sm' src={product.imageUrl} width={64} height={64} alt="" />
                                <span>{product.name}</span>
                            </Link>
                        ))}
                    </div>
                }
            </div>

        </>

    )
}

