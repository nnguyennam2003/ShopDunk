import dayjs from "dayjs";

export function formatDateToDMY(date) {
    if (!date) return "";
    return dayjs(date).format("DD-MM-YYYY");
}