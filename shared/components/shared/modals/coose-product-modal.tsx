'use client'

import { Dialog } from '@/shared/components/ui'
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import { cn } from '@/shared/lib/utils'
import { ProductForm } from '../index'
import { useRouter } from 'next/navigation'
import { Iproduct } from '@/@types/prisma'

interface Props {
    product: Iproduct
    className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
    const router = useRouter()

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back() }>
            <DialogContent
                aria-describedby={undefined}
                className={cn(
                    'max-w-[1060px] min-h-[562px] max-h-screen bg-background ms:overflow-y-scroll sm:scrollbar sm:pr-1',
                    className
                )}>
                <DialogTitle hidden>Title</DialogTitle>
                <ProductForm product={product} _onSubmit={() => router.back()}/>
            </DialogContent>
        </Dialog>
    )
}