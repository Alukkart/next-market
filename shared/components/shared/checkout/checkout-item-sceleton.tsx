import { cn } from '@/shared/lib/utils'

interface Props{
    className?:string
}

export const CheckoutItemSceleton: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('flex items-center justify-between', className)}>
            <div className='flex items-center gap-5'>
                <div className='w-[50px] h-[50px] bg-card animate-pulse rounded-full'/>
                <h2 className='w-40 h-5 bg-card rounded animate-pulse'/> {/* TODO: взять другой бг или изменить card для светлой темы */}
            </div>

            <div className='h-5 w-10 bg-card rounded animate-pulse'/>
            <div className='h-8 w-[133px] bg-card rounded animate-pulse'/>
        </div>
    )
}