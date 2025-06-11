import instance from "@/lib/axios"

const getAddressDefault = () => {
    return instance.get('/address/default')
}

export { getAddressDefault }
