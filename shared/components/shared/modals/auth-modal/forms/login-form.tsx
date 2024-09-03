import { cn } from '@/shared/lib/utils'
import { FormProvider, useForm } from 'react-hook-form'
import { formLoginSchema, TFormLoginValues } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput, Title } from '../../..'
import { Button } from '@/shared/components/ui'
import { Smartphone } from 'lucide-react'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

interface Props {
    onClose: () => void
    className?: string
}

export const LoginForm: React.FC<Props> = ({ className, onClose }) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const res = await signIn('credentials', {
                ...data,
                redirect: false
            })

            if (!res?.ok) {
                throw new Error(`[LOGIN] Error ${__filename} ${res?.error}`)
            }

            toast.success('Вы успешно вошли в аккаунт')

            onClose()
        } catch (error) {
            console.log(`[LOGIN] Error ${__filename} ${error}`)
            toast.error('Не удалось войти в аккаунт')
        }
    }

    return (
        <FormProvider {...form}>
            <form className={cn('flex flex-col gap-5', className)} onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title text="Вход в аккаунт" size="md" className="font-bold" />
                        <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
                    </div>
                    <Image className='md:block hidden' src="/phone-icon.png" alt="phone-icon" width={60} height={60} />
                </div>

                <FormInput name="email" label="E-Mail" required />
                <FormInput name="password" label="Пароль" type="password" required />

                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    Войти
                </Button>
            </form>
        </FormProvider>
    )
}