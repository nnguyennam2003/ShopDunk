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

export const titleCategorySwitch = (category) => {
    switch (category) {
        case 'iphone':
            return 'iPhone';
        case 'mac':
            return 'MacBook';
        case 'ipad':
            return 'iPad';
        case 'accessories':
            return 'Phụ kiện';
        case 'watch':
            return 'Đồng hồ';
        case 'airpods':
            return 'AirPods';
        default:
            return category.charAt(0).toUpperCase() + category.slice(1);
    }
}