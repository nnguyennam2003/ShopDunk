import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingBtn from "@/components/common/Loading/LoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slices/authSlice";

export function LoginForm({ className, ...props }) {
  const { user, isLoading } = useSelector((state) => state.auth)

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate()
  const dispatch = useDispatch();


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

    dispatch(login({ email, password }))
  }

  return (
    (<form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <LoadingBtn /> : "Login"}
        </Button>
        <div
          className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={'/signup'} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>)
  );
}
