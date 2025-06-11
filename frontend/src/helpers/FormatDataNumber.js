import dayjs from "dayjs";

export function formatDateToDMY(date) {
    if (!date) return "";
    return dayjs(date).format("DD-MM-YYYY");
}

export function formatDateTimeVN(date) {
    if (!date) return "";
    return dayjs(date).format("HH:mm - DD/MM/YYYY");
}

export function formatVND(number) {
    if (number === null || number === undefined) return "";
    return Number(number).toLocaleString("vi-VN");
}