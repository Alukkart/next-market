'use server'

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared";
import { CheckoutFormValues } from "@/shared/components/shared/checkout/schemas/checkout-form-schema";
import { verificationUserTemplate } from "@/shared/components/shared/email-templates/verification-user";
import { createPayment } from "@/shared/lib/create-payment";
import { getUserSession } from "@/shared/lib/get-user-session";
import { sendEmail } from "@/shared/lib/send-email";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cartToken = cookies().get('cartToken')?.value

        if (!cartToken) {
            throw new Error(`[CREATE_ORDER] Error ${__filename} Token not found`)
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                token: cartToken
            },
            include: {
                user: true,
                cartItems: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        })

        if (!userCart) {
            throw new Error(`[CREATE_ORDER] Error ${__filename} Cart not found`)
        }

        if (userCart?.totalAmount === 0) {
            throw new Error(`[CREATE_ORDER] Error ${__filename} Cart is empty`)
        }

        // Create order
        const order =await prisma.order.create({
            data: {
                token: cartToken,
                fullname: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: "PENDING",
                items: JSON.stringify(userCart.cartItems),
            }
        })

        // Empty cart
        await prisma.cart.update({
            where: {
                id: 3
            },
            data: {
                totalAmount: 0,
                cartItems: {
                    deleteMany: {}
                }
            }
        })

        const paymentData = await createPayment({
            orderId: order.id,
            amount: order.totalAmount,
            description: 'Оплата заказа'
        })

        if (!paymentData) {
            throw new Error(`[CREATE_ORDER] Error ${__filename} Payment error`)
        }

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paymentId: paymentData.id
            }
        })

        sendEmail(data.email, 'Заказ создан',
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl: paymentData.confirmation.confirmation_url
            })
        )

        return paymentData.confirmation.confirmation_url
    } catch (error) {
        console.log(`[CREATE_ORDER] Error ${__filename} ${error}`)
        return error
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {

        console.log(`[UPDATE_USER] Error ${__filename} error`)

        const currentUser = await getUserSession()

        if (!currentUser) {
            throw new Error('[UPDATE_USER_INFO] Error User not found')
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        })

        await prisma.user.update({
            where: {
                id: Number(currentUser.id)
            },
            data:{
                email: body.email,
                fullName: body.fullName,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password
            }
        })


    }catch(error) {
        console.log(`[UPDATE_USER] Error ${__filename} ${error}`)
    }
}


export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where:{
                email: body.email
            }
        })

        if(user) {
            if(!user.verified) {
                throw new Error(`[REGISTER_USER] Error ${__filename} User email not verified`)
            }

            throw new Error(`[REGISTER_USER] Error ${__filename} User already exists`)
        }

        const createdUser = await prisma.user.create({
            data: {
                email: body.email,
                fullName: body.fullName,
                password: hashSync(body.password as string, 10)
            }
        }) // удаление пользователя если не подтвердил почту в течении суток

        const code = Math.floor(100000 + Math.random() * 900000).toString()

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id
            }
        })

        await sendEmail(
            createdUser.email,
            `Next Pizza / Подтверждение регистрации`,
            verificationUserTemplate({code})
        )
        
    } catch (error) {
        console.log(`[REGISTER_USER] Error ${__filename} ${error}`)
    }
}