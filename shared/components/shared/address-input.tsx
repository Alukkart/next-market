'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
    console.log()
    return (
        <AddressSuggestions
            inputProps={{ className: 'flex w-full rounded-md px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-12 text-md', placeholder: 'Адрес', }}
            suggestionsClassName='bg-background mt-2 rounded-md'
            currentSuggestionClassName='!bg-card'
            suggestionClassName='hover:!bg-card rounded-md react-dadata__suggestion'
            token=''
            onChange={(data) => onChange?.(data?.value)}
        />
    );
};