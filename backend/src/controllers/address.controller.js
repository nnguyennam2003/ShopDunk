import {
    getAddressesDB,
    addAddressDB,
    updateAddressDB,
    deleteAddressDB,
    setDefaultAddressDB,
    getAddressDefaultDB
} from '../models/address.model.js'

export const getAddresses = async (req, res) => {
    try {
        const userId = req.user.userId
        const addresses = await getAddressesDB(userId)
        res.json(addresses)
    } catch (error) {
        console.error("Get addresses error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const addAddress = async (req, res) => {
    try {
        const userId = req.user.userId
        const { address_detail, city, district, ward, is_default } = req.body
        const address = await addAddressDB(userId, address_detail, city, district, ward, is_default)
        res.json(address)
    } catch (error) {
        console.error("Add address error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const updateAddress = async (req, res) => {
    try {
        const userId = req.user.userId
        const addressId = req.params.id
        const { address_detail, city, district, ward, is_default } = req.body
        const address = await updateAddressDB(userId, addressId, address_detail, city, district, ward, is_default)
        res.json(address)
    } catch (error) {
        console.error("Update address error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const deleteAddress = async (req, res) => {
    try {
        const userId = req.user.userId
        const addressId = req.params.id
        await deleteAddressDB(userId, addressId)
        res.json({ message: "Address deleted" })
    } catch (error) {
        console.error("Delete address error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const setDefaultAddress = async (req, res) => {
    try {
        const userId = req.user.userId
        const addressId = req.params.id
        await setDefaultAddressDB(userId, addressId)
        res.json({ message: "Set default address success" })
    } catch (error) {
        console.error("Set default address error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getAddressDefault = async ( req, res) => {
    try{
        const userId = req.user.userId
        const address = await getAddressDefaultDB(userId)
        res.json(address)
    } catch (error) {
        console.error("Get default address error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}