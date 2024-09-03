import { cn } from '@/shared/lib/utils'
import { Title } from '.'
import { Button } from '../ui'
import Image from 'next/image'

interface Props {
    imageUrl: string
    name: string
    price: number
    onSubmit?: () => void
    className?: string
    loading?: boolean
}

export const ChooseProductForm: React.FC<Props> = ({ imageUrl, name, price, onSubmit, className, loading }) => {
    return (
        <div className={cn('flex flex-wrap justify-center', className)}>
            <div className='flex flex-1 items-center justify-center relative w-full xs:min-w-[300px] sm:min-h-[400px]'>
                <Image
                    width={300}
                    height={300}
                    draggable={false}
                    src={imageUrl}
                    alt={name}
                    className={cn('releative ml-6 mt-6 transition-all z-10 duration-300 aspect-square')}
                />
            </div>


            <div className="md:w-[490px] bg-background p-6 relative mr-1">
                <Title text={name} size='md' className="font-extrabold mb-1" />

                <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                <Button loading={loading} onClick={() => onSubmit?.()} className='absolute -bottom-2 right-0 h-[55px] text-base font-semibold rounded-full w-full'>
                    В корзину за {price} ₽
                </Button>
            </div>
        </div>
    )
}