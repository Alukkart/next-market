import { prisma } from "@/prisma/prisma-client"
import { findOrCreateCart } from "@/shared/lib/fing-or-create-cart"
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount"
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto"
import { CartItem } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies.get('cartToken')?.value

        if (!token) return NextResponse.json({ totalAmount: 0, cartItems: [] })

        const userCart = await prisma.cart.findFirst({
            where: {
                token: token
            },
            include: {
                cartItems: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true
                            }
                        },
                        ingredients: true
                    }

                }
            }
        })

        return NextResponse.json(userCart)
    } catch (error) {
        console.error(error)
        return NextResponse.json([])
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const data = (await req.json()) as CreateCartItemValues

        let token = req.cookies.get('cartToken')?.value

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token)

        const findCartItem = await prisma.cartItem.findFirst({ //TODO исправить баг с добавлением повторяющихся товаров сделав свой SQL запрос
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                ingredients: {
                    every: {
                        id: { in: data.ingredientsIds }
                    },
                    some:{}
                }
            }

        })

        // const findCartItem = await prisma.$queryRaw<CartItem>`SELECT * FROM "CartItem" WHERE "cartId" = ${userCart.id} AND "productItemId" = ${data.productItemId} AND "ingredients" @> ${data.ingredientsIds?.map((id) => ({ id: id }))}`

        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id
                },
                data: {
                    quantity: findCartItem.quantity + 1
                }
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: { connect: data.ingredientsIds?.map((id) => ({ id: id })) }
                }
            })
        }

        const updatedUserCart = await updateCartTotalAmount(token)

        const res = NextResponse.json(updatedUserCart)
        res.cookies.set('cartToken', token,)
        return res

    } catch (error) {
        console.error('[CART-POST]', error)
        return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 })
    }
}