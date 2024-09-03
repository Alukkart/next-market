import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { Title } from '.';
import { Button } from '../ui';
import Image from 'next/image';
import { Ingredient } from '@prisma/client';

interface Props {
    id:number
    name: string;
    price: number;
    imageUrl: string;
    ingredients: Ingredient[]
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, ingredients, className }) => {
    return (
        <div className={cn(ingredients.length > 0 && 'relative min-h-[465px]', className)}>
            <Link href={`/product/${id}`} className='relative'>
                <div className='rounded-lg h-[260px] lg:w-[254px]'>
                    <Image width={256} height={256} draggable={false} src={imageUrl} className='aspect-square mx-auto transition-all duration-300 hover:translate-y-1' alt={name}/>
                </div>

                <Title text={name} size='sm' className='mb-1 mt-3 font-bold line-clamp-2 h-[66px]' />

                <p className='text-gray-400 line-clamp-2'>
                    {ingredients.map((ingredient) => ingredient.name).join(', ')}
                </p>

                <div className='flex justify-between items-center mt-4'>
                    <span className='text-[20px]'>
                        от <b>{price} ₽</b>
                    </span>
                    <Button variant={'default'} className='text-base rounded-full h-10 font-bold'
                     size='sm'>
                        В корзину
                    </Button>
                </div>
            </Link>
        </div>
    )
}