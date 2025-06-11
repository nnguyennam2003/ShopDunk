import instance from "@/lib/axios"

const checkoutOrder = (checkoutData) => {
    return instance.post('/checkout', checkoutData)
}

export { checkoutOrder }