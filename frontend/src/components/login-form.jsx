import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "@/store/slices/authSlice";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import LoadingBtn from "@/components/common/Loading/LoadingBtn";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/schema";
import { useState } from "react";

export function LoginForm({ className, ...props }) {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    await dispatch(login(data)).unwrap();
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await dispatch(loginWithGoogle()).unwrap();
    } finally {
      setGoogleLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng nhập</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Nhập Email và mật khẩu để đăng nhập
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
            {...register("email")}
          />
          {touchedFields.email && errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu</Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Quên mật khẩu?
            </a> */}
          </div>
          <Input
            id="password"
            type="password"
            {...register("password")}
          />
          {touchedFields.password && errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingBtn /> : "Đăng nhập"}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Hoặc đăng nhập với
          </span>
        </div>

        <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={googleLoading}>
          Đăng nhập với Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Bạn chưa có tài khoản?{" "}
        <Link to={"/signup"} className="underline underline-offset-4">
          Đăng ký
        </Link>
      </div>
    </form>
  );
}
