import { cn } from '@/shared/lib/utils'
import { CircleCheck } from 'lucide-react'
import Image from 'next/image'

interface Props {
    imageUrl: string
    name: string
    price: number
    active?: boolean
    onClick?: VoidFunction
    className?: string
}

export const IngredientItem: React.FC<Props> = ({ className, imageUrl, name, price, active, onClick }) => {
    return (
        <div onClick={onClick} className={cn(
            'flex flex-col items-center relative mx-auto select-none rounded-md w-32 text-center cursor-pointer shadow-lg bg-secondary border border-transparent',
            { 'border border-primary': active },
            className
        )}>
            {active && <CircleCheck className='absolute top-1 right-1 text-2xl text-primary' />}
            <Image draggable={false} src={imageUrl} alt={name} width={110} height={110} />

            <p className='text-sm font-medium'>{name}</p>
            <p className='text-sm font-bold'>{price} ₽</p>
        </div>
    )
}