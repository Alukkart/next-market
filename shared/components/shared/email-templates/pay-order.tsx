import * as React from 'react';

interface Props {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Readonly<Props>> = ({
    orderId,
    totalAmount,
    paymentUrl,
}) => (
    <div>
        <h1>Заказ #{orderId}</h1>

        <p>Оплатите заказ на сумму {totalAmount} ₽. Перейдите по <a href={paymentUrl}>ссылке</a> для оплаты.</p>
    </div>
);
