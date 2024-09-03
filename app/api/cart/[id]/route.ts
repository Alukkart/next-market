import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma/prisma-client"
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount"

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const id = Number(params.id)
        const data = (await req.json() as { quantity: number })
        const token = req.cookies.get('cartToken')?.value

        if (!token) { return NextResponse.json({ error: 'Cart token not found' }, { status: 404 }) }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id
            }
        })

        if (!cartItem) { return NextResponse.json({ error: 'Cart item not found' }, { status: 404 }) }

        await prisma.cartItem.update({
            where: {
                id
            },
            data: {
                quantity: data.quantity
            }
        })

        const updatedUserCart = await updateCartTotalAmount(token)

        return NextResponse.json(updatedUserCart)

    } catch (error) {
        console.error('[CART-PATCH]', error)
        return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 })
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const id = Number(params.id)
        const token = req.cookies.get('cartToken')?.value

        if (!token) { return NextResponse.json({ error: 'Cart token not found' }, { status: 404 }) }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: id
            }
        })

        if (!cartItem) { return NextResponse.json({ error: 'Cart item not found' }, { status: 404 }) }

        await prisma.cartItem.delete({
            where: {
                id: id
            }
        })

        const updatedUserCart = await updateCartTotalAmount(token)

        return NextResponse.json(updatedUserCart)

    } catch (error) {
        console.error('[CART-DELETE]', error)
        return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 })
    }
}