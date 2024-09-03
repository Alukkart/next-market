import { cn } from '@/shared/lib/utils'
import { ArrowUpDown } from 'lucide-react'

interface Props {
    className?: string
}

export const SortPopup: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('inline-flex items-center gap-1 bg-gray-50 dark:bg-secondary px-5 h-[52px] rounded-2xl cursor-pointer', className)}>
            <ArrowUpDown size={16} />
            <b className='hidden md:block'>Сортировка:</b>
            <b className='text-primary'>популярное</b>
        </div>
    )
}