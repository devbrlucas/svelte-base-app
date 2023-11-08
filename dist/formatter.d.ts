type DateStyles = {
    dateStyle?: Intl.DateTimeFormatOptions['dateStyle'];
    timeStyle?: Intl.DateTimeFormatOptions['timeStyle'];
};
declare function formatDate(date: string, styles?: DateStyles, utc?: boolean): string;
declare function formatCurrency(value: number, currency?: string): string;
declare function formatDocument(type: 'cpf' | 'cnpj', value: number | string): string;
declare function formatPhone(value: number | string): string;
export declare const formatter: {
    date: typeof formatDate;
    currency: typeof formatCurrency;
    document: typeof formatDocument;
    phone: typeof formatPhone;
};
export {};
