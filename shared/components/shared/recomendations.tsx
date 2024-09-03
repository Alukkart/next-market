import { cn } from '@/shared/lib/utils'
import { ProductCard, Title } from '.'
import { Iproduct } from '@/@types/prisma'
import { prisma } from '@/prisma/prisma-client'

interface Props {
    categoryId: number
    className?: string
}

export const Recomendations: React.FC<Props> = async ({ className, categoryId }) => {

    const products = await prisma.product.findMany({
        where: {
            categoryId: categoryId
        },
        include: {
            items: true,
            ingredients: true
        },
        take: 6
    })

    return (
        <div className={cn('mt-5', className)}>
            <Title className='my-3 font-bold' text='С этим покупают:' />
            <div className='flex flex-1 gap-10 bg-card rounded-md p-5 overflow-x-scroll scrollbar'>
                {
                    products.map((item, index) => (
                        <ProductCard
                            className='max-w-64 h-fit'
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