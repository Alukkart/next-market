import { cn } from '@/shared/lib/utils'
import { CheckoutBlock, FormInput } from '..'

interface Props {
    className?: string
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
    return (
        <CheckoutBlock title='2. Персональные данные' className={cn('', className)} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput className="text-base" name="firstName" placeholder="Имя" />
                <FormInput className="text-base" name="lastName" placeholder="Фамилия" />
                <FormInput className="text-base" name="email" placeholder="E-Mail" />
                <FormInput className="text-base" name="phone" placeholder="Телефон" />
            </div>
        </CheckoutBlock >
    )
}