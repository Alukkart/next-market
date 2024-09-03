import { Container, Header } from "@/shared/components/shared"
import { Metadata } from "next"
import "../globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Next Pizza | Корзина',
    description: 'Next Pizza | Корзина',
}

export default function CheckoutLayout({children,}: {children: React.ReactNode}) {
    return (
        <main className="">
            <Suspense>
                <Header hasSearch={false} hasCartButton={false}/>
            </Suspense>
            <Container>
            {children}
            </Container>
        </main>
    )
}