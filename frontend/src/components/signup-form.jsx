import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/store/slices/authSlice";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm } from "react-hook-form";
import { signupSchema } from "@/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingBtn from "@/components/common/Loading/LoadingBtn";

export function SignUpForm({ className, ...props }) {
    const { isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
    });

    const onSubmit = (data) => {
        const {...rest } = data;
        dispatch(register(rest))
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Đăng ký</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Điền thông tin vào bên dưới để tạo tài khoản
                </p>
            </div>

            <div className="grid gap-6">
                {/* Email */}
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...formRegister("email")}
                    />
                    {touchedFields.email && errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="grid gap-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" type="tel" {...formRegister("phone")} />
                    {touchedFields.phone && errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                </div>

                {/* Full name */}
                <div className="grid gap-2">
                    <Label htmlFor="fullName">Họ tên</Label>
                    <Input id="fullName" type="text" {...formRegister("fullName")} />
                    {touchedFields.fullName && errors.fullName && (
                        <p className="text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="grid gap-2">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Input id="password" type="password" {...formRegister("password")} />
                    {touchedFields.password && errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        {...formRegister("confirmPassword")}
                    />
                    {touchedFields.confirmPassword && errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <LoadingBtn /> : "Đăng ký"}
                </Button>
            </div>

            <div className="text-center text-sm">
                Đã có tài khoản?{" "}
                <Link to={"/login"} className="underline underline-offset-4">
                    Đăng nhập
                </Link>
            </div>
        </form>
    );
  }