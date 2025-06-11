import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { register } from "@/store/slices/authSlice";

export function SignUpForm({
    className,
    ...props
}) {
    const { isLoading } = useSelector((state) => state.auth)

    const dispatch = useDispatch();

    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [fullName, setFullName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(register({ email, phone, fullName, password }))
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Đăng ký</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Điền thông tin vào bên dưới để tạo tài khoản
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" type="number" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="fullname">Họ tên</Label>
                    <Input id="fullname" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? <LoadingBtn /> : "Đăng ký"}
                </Button>
            </div>
            <div className="text-center text-sm">
                Đã có tài khoản?{" "}
                <Link to={'/login'} className="underline underline-offset-4">
                    Đăng nhập
                </Link>
            </div>
        </form>
    );
}
