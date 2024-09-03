import { Button } from '../ui'
import { CircleUser, User } from 'lucide-react'
import { useSession, signIn } from "next-auth/react"
import Link from 'next/link'

interface Props {
    onClickSignIn?: () => void
    className?: string
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
    const { data: session } = useSession()

    return (
        <>
            {
                !session ?
                    <Button onClick={onClickSignIn} variant='outline' className="flex h-10 p-3 items-center gap-1">
                        <User size={16} className="h-4 w-4" />
                        <b className="hidden lg:block aspect-square md:aspect-auto">Войти</b>
                    </Button>
                    :
                    <Link href='/profile'>
                        <Button variant='outline' className="flex h-10 p-3 items-center gap-1">
                            <CircleUser size={16} className="h-4 w-4" />
                            <b className="hidden lg:block aspect-square md:aspect-auto">Профиль</b>
                        </Button>
                    </Link>
            }

        </>
    )
}