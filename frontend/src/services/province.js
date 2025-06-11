import axios from "axios"

const getAllCity = () => {
    return axios.get('https://provinces.open-api.vn/api/p/')
}

const getAllDistrict = (cityId) => {
    return axios.get(`https://provinces.open-api.vn/api/p/${cityId}?depth=2`)
}

const getAllWard = (districtId) => {
    return axios.get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`)
}

export {
    getAllCity,
    getAllDistrict,
    getAllWard
}
