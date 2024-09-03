import { cn } from '@/shared/lib/utils'
import { Button } from '../ui'
import { X } from 'lucide-react'

interface Props{
    onClick?: () => void
    className?:string
}

export const ClearButton: React.FC<Props> = ({ className, onClick }) => {
    return (
        <Button variant={'ghost'} className={cn('p-2 absolute top-1/2 right-2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer', className)} onClick={onClick}>
            <X className='h-5 w-5' />
        </Button>
    )
}