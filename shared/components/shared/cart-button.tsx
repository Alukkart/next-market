'use client'

import { ArrowRight, ShoppingCart } from "lucide-react"
import { Button } from "../ui"
import { cn } from "@/shared/lib/utils"
import { CartDrawer } from "."
import { useCartStore } from "@/shared/store/cart"

interface Props {
    className?: string
}

export const CartButton: React.FC<Props> = ({ className }) => {
    const [totalAmount, loading, length] = useCartStore((state) => [state.totalAmount, state.loading, state.items])


    return (
        <CartDrawer>
            <Button loading={loading} variant="outline" className={cn("group relative", className, totalAmount === 0 && "hidden")}>
                <b className="font-bold">{totalAmount} ₽</b>
                <span className="h-full w-px bg-secondary mx-3"></span>
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart size={16} className="h-4 w-4 relative" strokeWidth={2} />
                    <b>{length.length}</b>
                </div>
                <ArrowRight size={20} className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button>
        </CartDrawer>

    )
}
