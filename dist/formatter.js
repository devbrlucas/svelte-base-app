function formatDate(date, styles = {}, utc = false) {
    const formatter = new Intl.DateTimeFormat(window.navigator.language, {
        dateStyle: styles.dateStyle ?? 'short',
        timeStyle: styles.timeStyle ?? 'short',
        timeZone: utc ? 'UTC' : undefined,
    });
    const dateObject = new Date(date);
    return formatter.format(dateObject);
}
function formatCurrency(value, currency = 'BRL') {
    const formatter = new Intl.NumberFormat(window.navigator.language, {
        currency,
        style: 'currency',
    });
    return formatter.format(value);
}
function formatDocument(type, value) {
    value = String(value);
    if (type === 'cnpj') {
        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    else if (type === 'cpf') {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
}
function formatPhone(value) {
    value = String(value);
    const REPLACE = '($1)$2-$3';
    if (value.length === 11) {
        return String(value).replace(/(\d{2})(\d{5})(\d{4})/, REPLACE);
    }
    else if (value.length === 10) {
        return String(value).replace(/(\d{2})(\d{4})(\d{4})/, REPLACE);
    }
    return value;
}
export const formatter = {
    date: formatDate,
    currency: formatCurrency,
    document: formatDocument,
    phone: formatPhone,
};
