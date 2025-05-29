import { SignUpForm } from '@/components/signup-form'
import React from 'react'
import appleLogo from "../assets/images/Apple_logo_black.svg"
import signUpImage from "../assets/images/sigup_image.avif"
import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="/" className="flex items-center gap-2 font-medium">
                        <div className="flex h-5 w-5 items-end justify-center">
                            <img src={appleLogo} alt="logo" />
                        </div>
                        ShopDunk
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignUpForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src={signUpImage}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
