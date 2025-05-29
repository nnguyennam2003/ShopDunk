import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { register } from "@/store/slices/authSlice";

export function SignUpForm({
    className,
    ...props
}) {
    const { user, isLoading } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [fullName, setFullName] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        if (user) {
            if (user.role === "admin") {
                navigate("/admin/dashboard")
            } else {
                navigate("/")
            }
        }

    }, [user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login logic here
        dispatch(register({ email, phone, fullName, password }))
        console.log({ email, phone, fullName, password });
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Please fill in this form to create an account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="number" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="fullname">Full name</Label>
                    <Input id="fullname" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit} disabled={isLoading}>
                    Sign up
                </Button>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={'/login'} className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </form>
    );
}
