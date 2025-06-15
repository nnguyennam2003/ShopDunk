import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().nonempty("Vui lòng nhập email"),
    password: z.string().nonempty("Vui lòng nhập mật khẩu"),
})


export const signupSchema = z.object({
    email: z.string().nonempty("Vui lòng nhập email").email("Email không hợp lệ"),
    phone: z
        .string()
        .nonempty("Vui lòng nhập số điện thoại")
        .regex(/^\d{10,11}$/, "Số điện thoại không hợp lệ"),
    fullName: z.string().nonempty("Vui lòng nhập họ tên"),
    password: z
        .string()
        .nonempty("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải ít nhất 6 ký tự"),
    confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
})