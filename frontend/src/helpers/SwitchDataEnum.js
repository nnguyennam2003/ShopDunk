export const enumGenderSwitch = (gender) => {
    switch (gender) {
        case 'male':
            return 'Nam';
        case 'female':
            return 'Nữ';
    }
}

export const enumPaymentMethodSwitch = (paymentMethod) => {
    switch (paymentMethod) {
        case 'cash':
            return 'Thanh toán khi nhận hàng';
        case 'zalopay':
            return 'Thanh toán online';
    }
}