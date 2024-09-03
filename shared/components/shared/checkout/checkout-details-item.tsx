import { cn } from '@/shared/lib/utils'
import { ReactNode } from 'react'

interface Props {
    title: React.ReactNode
    value: string | ReactNode
    className?: string
}

export const CheckoutDetailsItem: React.FC<Props> = ({ className, title, value }) => {
    return (
        <div className={cn('', className)}>
            <div className="flex my-4">
                <span className="flex flex-1 text-lg">
                    {title}
                    <div className="flex-1 border-b border-dashed border-b-foreground relative -top-1 mx-2" />
                </span>

                <span className="font-bold text-lg">{value}</span>
            </div>
        </div>
    )
}