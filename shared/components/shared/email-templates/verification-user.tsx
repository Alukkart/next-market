import * as React from 'react';

interface Props {
    code: string;
}

export const verificationUserTemplate: React.FC<Readonly<Props>> = ({code}) => (
    <div>
        <h2>Код подтверждения: <h1>{code}</h1></h2>

        <p><a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a></p>
    </div>
);
