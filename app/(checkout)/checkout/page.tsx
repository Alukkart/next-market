"use client";

import { CheckoutSideBlock, Title, CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm, } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import { useForm, FormProvider } from "react-hook-form";
import {
    checkoutFormSchema,
    CheckoutFormValues,
} from "../../../shared/components/shared/checkout/schemas/checkout-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/shared/lib/utils";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false);
    const { totalAmount, items, updateItemQuantity, removeCartItem, loading} = useCart();
    const { data: session } = useSession()

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: "",
        },
    });

    React.useEffect(() => {

        async function fetchUserInfo() {
            const data = await Api.auth.getMe()
            const [firstName, lastName] = data.fullName.split(' ')

            form.setValue('firstName', firstName)
            form.setValue('lastName', lastName)
            form.setValue('email', data.email)
        }

        if (session) {
            fetchUserInfo()
        }
    })

    const onSubmit = async(data: CheckoutFormValues) => {
        try {
            setSubmitting(true)
            const url = await createOrder(data);

            if (url) {
                window.location.href = url as string
            }

            toast.success('Заказ успешно создан! Переход к оплате...', {
                icon: '✅'
            })
        } catch (error) {
            console.log(`[CREATE_ORDER] Error ${__filename} error`)
            setSubmitting(false)
            toast.error('Не удалось создать заказ', {
                icon: '❌'
            })
        }
    };

    const onClickCountButton = (
        id: number,
        quantity: number,
        type: "plus" | "minus"
    ) => {
        updateItemQuantity(id, type === "plus" ? quantity + 1 : quantity - 1);
    };

    return (
        <div className="mt-10">
            <Title
                text="Оформление заказа"
                size="md"
                className="font-extrabold mb-8"
            />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={cn(loading && 'opacity-20 animate-pulse pointer-events-none')}>
                    <div className={cn("flex flex-1 flex-wrap gap-8 mb-20")}>
                        {/* Left block */}
                        <div className="flex flex-1 flex-col gap-6 w-4/5 min-w-[270px]"> {/* max-w-[800px] */}
                            <CheckoutCart
                                // loading={loading}
                                items={items}
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                            />

                            <CheckoutPersonalForm />

                            <CheckoutAddressForm />

                            <CheckoutSideBlock loading={loading || submitting} totalAmount={totalAmount} className="flex flex-1 flex-col tablet:hidden"/>
                        </div>
                        {/* h-fit w-full sm:w-1/5 min-w-[333px] sm:max-w-[500px] */}
                        {/* Right block */}
                        <CheckoutSideBlock loading={loading || submitting} totalAmount={totalAmount} className="hidden tablet:flex flex-1 flex-col max-w-96"/>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
