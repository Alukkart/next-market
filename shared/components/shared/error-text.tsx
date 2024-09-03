import { cn } from '@/shared/lib/utils'

interface Props{
    text:string
    className?:string
}

export const ErrorText: React.FC<Props> = ({ className, text }) => {
    return (
        <p className={cn('text-red-500 text-sm', className)}>{text}</p>
    )
}