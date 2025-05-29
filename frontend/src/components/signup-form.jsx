import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom";

export function SignUpForm({
    className,
    ...props
}) {
    return (
        (<form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Please fill in this form to create an account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="number" required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="fullname">Full name</Label>
                    <Input id="fullname" type="text" required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Sign up
                </Button>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={'/login'} className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </form>)
    );
}
