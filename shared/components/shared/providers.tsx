'use client'

import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "./theme-provider";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <SessionProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </SessionProvider>
            <Toaster toastOptions={{className: '!bg-background !text-foreground' }} />
            <NextTopLoader />
            <div className="bg-background bg-slate-950"></div>
        </>
    )
}