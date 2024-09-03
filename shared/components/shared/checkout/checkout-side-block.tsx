import { cn } from '@/shared/lib/utils'
import { CheckoutBlock, CheckoutDetailsItem } from '..'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import { Button, Skeleton } from '../../ui'

interface Props {
    loading?: boolean
    totalAmount: number
    className?: string
}

const VAT = 15
const DELIVERY_COST = 250

export const CheckoutSideBlock: React.FC<Props> = ({ className, totalAmount, loading }) => {
    const vatPrice = (totalAmount * VAT) / 100
    const totalPrice = totalAmount + vatPrice + DELIVERY_COST

    return (
        <CheckoutBlock className={cn('p-6 sticky top-4 h-fit', className)} >
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                {loading ? (
                    <Skeleton className="h-11 w-48" />
                ) : (
                    <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
                )}
            </div>

            <CheckoutDetailsItem
                title={
                    <div className="flex items-center">
                        <Package size={18} className="mr-2 text-gray-400" />
                        Товары:
                    </div>
                }
                value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} ₽`}
            />
            <CheckoutDetailsItem
                title={
                    <div className="flex items-center">
                        <Percent size={18} className="mr-2 text-gray-400" />
                        Налог:
                    </div>
                }
                value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${vatPrice} ₽`}
            />
            <CheckoutDetailsItem
                title={
                    <div className="flex items-center">
                        <Truck size={18} className="mr-2 text-gray-400" />
                        Доставка:
                    </div>
                }
                value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${DELIVERY_COST} ₽`}
            />

            <Button
                loading={loading}
                type="submit"
                className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </CheckoutBlock >
    )
}