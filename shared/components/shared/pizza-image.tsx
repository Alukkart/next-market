import { cn } from '@/shared/lib/utils'
import Image from 'next/image'

interface Props {
    className?: string
    imageUrl: string
    size: 20 | 30 | 40
    alt: string
}

export const PizzaImage: React.FC<Props> = ({ className, imageUrl, size, alt }) => {
    return (
        <div className={cn('flex flex-1 items-center justify-center relative w-full xs:min-w-[400px] sm:min-h-[400px]', className)}>
            <Image
                width={300}
                height={300}
                draggable={false}
                src={imageUrl}
                alt={alt}
                className={cn('releative ml-6 mt-6 transition-all z-10 duration-300 aspect-square w-auto', {
                    'sm:w-[300px] sm:h-[300px]': size == 20,
                    'sm:w-[350px] sm:h-[350px]': size == 30,
                    'sm:w-[400px] sm:h-[400px]': size == 40
                })}
            />

            <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full dark:border-secondary border-gray-200 w-[320px] h-[320px]" />
            <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full dark:border-secondary border-gray-200 w-[370px] h-[370px]" />
        </div>
    )
}

