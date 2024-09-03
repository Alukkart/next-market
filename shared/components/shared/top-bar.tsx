import { cn } from '@/shared/lib/utils'
import { Categories, SortPopup } from '.'
import { Category } from '@prisma/client'

interface Props {
    className?: string
    categories: Category[]
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
    return (
        <div className={cn('sticky top-0 z-10', className)}>
            <div className='flex items-center justify-between shadow-lg light:shadow-secondary bg-card/95 p-3 rounded-xl scrollbar overflow-auto'>
                <Categories items={categories} />
                <SortPopup className='hidden lg:inline-flex' />
            </div>
        </div>
    )
}