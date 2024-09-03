'use client'

import { cn } from '@/shared/lib/utils'
import { AddressInput, CheckoutBlock, ErrorText } from '..'
import { FormTextarea } from '../form-components/form-textarea'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
    className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    const { control } = useFormContext()

    return (
        <CheckoutBlock title='3. Адрес доставки' className={cn('', className)}>
            <div className="flex flex-col gap-5">
                <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <div>
                            <AddressInput onChange={field.onChange} />
                            {fieldState.error?.message && <ErrorText className='mt-2' text={fieldState.error.message} />}
                        </div>
                    )}
                />

                <FormTextarea rows={5} name="comment" placeholder="Комментарий" className="text-base" />

            </div>
        </CheckoutBlock>
    )
}