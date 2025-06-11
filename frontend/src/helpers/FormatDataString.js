export function getFirstChar(str) {
    if (typeof str !== 'string' || str.length === 0) return '';
    return str.trim().charAt(0).toUpperCase();
}

export const joinStringAddress = (address) => {
    if (!address) return '';
    return [
        address.address_detail,
        address.ward,
        address.district,
        address.city
    ].filter(Boolean).join(', ');
}