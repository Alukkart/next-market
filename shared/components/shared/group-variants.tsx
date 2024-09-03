'use client'

import { cn } from '@/shared/lib/utils'

export type Variant = {
    name: string
    value: string
    disabled?: boolean
}

interface Props{
    items: readonly Variant[]
    defaultValue?: number
    onClik?:(value: Variant['value']) => void
    selectedValue?: Variant['value']
    className?:string
}

export const GroupVariants: React.FC<Props> = ({ className, items, defaultValue, onClik, selectedValue }) => {
    return (
        <div className={cn('flex justify-between bg-secondary/50 rounded-3xl p-1 select-none my-2', className)}>
            {
                items.map((item) => (
                    <button
                        key={item.value}
                        disabled={item.disabled}
                        onClick={() => onClik?.(item.value)}
                        className={cn(
                            'flex flex-1 items-center justify-center cursor-pointer h-[30px] px-5 rounded-3xl translation-all duration-300 text-sm',
                            {
                                'bg-white dark:bg-secondary shadow': item.value == selectedValue || item.value == String(defaultValue),
                                'text-gray-500 opacity-50 pointer-events-none': item.disabled
                            }
                        )}
                    >
                        {item.name}
                    </button>
                ))
            }
        </div>
    )
}