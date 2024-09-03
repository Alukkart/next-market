'use client'

import { cn } from "@/shared/lib/utils"
import { AuthModal, CartButton, Container, ProfileButton, SearchInput, ThemeToggle } from "./index"
import Image from "next/image"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useSession, signIn } from "next-auth/react"

interface Props {
    hasSearch?: boolean
    hasCartButton?: boolean
    className?: string
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCartButton = true, className }) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false)
    const searchParams = useSearchParams()


    React.useEffect(() => {
        if (searchParams.has('paid')) {
            setTimeout(() => {
                toast.success('Заказ оплачен')
            }, 500)
        }

        if (searchParams.has('verified')) {
            setTimeout(() => {
                toast.success('Аккаунт подтвержден')
            }, 500)
        }
    })

    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between px-1 md:px-4 py-1 md:py-8">
                {/* Logo */}
                <Link href={'/'}>
                    <div className="flex flex-nowrap items-center gap-4">
                        <Image src={'/logo.png'} alt='Logo' width={44} height={44} className="w-11 h-11" />
                        <div className="hidden md:block">
                            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                            <p className="text-sm text-gray-400 leading-3">вкуснее уже некуда</p>
                        </div>
                    </div>
                </Link>


                {hasSearch && <div className="mx-3 flex-1">
                    <SearchInput className="h-10" />
                </div>}

                {/* Right btns */}
                <div className="flex items-center gap-2">
                    <ThemeToggle className="h-10 w-10" />

                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>

                    {hasCartButton && <div className="hidden md:block">
                        <CartButton className="h-10" />
                    </div>}
                </div>
            </Container>
        </header>
    )
}