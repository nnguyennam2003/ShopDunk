import Navbar from '@/components/navbar'
import React from 'react'
import appleLogo from '@/assets/images/Apple_logo_black.svg'
import { LogIn, UserCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MenuMobile from '@/components/menu-mobile'
import { Link } from 'react-router-dom'
import CartSheet from '@/components/cart-sheet'
import MenuProfile from '@/components/menu-profile'
import { useSelector } from 'react-redux'

export default function Header() {
  const { user } = useSelector((state) => state.auth)
  console.log()
  return (
    <header className='bg-white w-full'>
      <div className='container mx-auto px-4 py-2 flex items-center justify-between'>
        <div className='w-5 sm:w-6'>
          <img src={appleLogo} alt="logo" />
        </div>
        <Navbar />
        {user && user.role !== null ? (
          <div className='flex gap-3'>
            <MenuProfile />
            <CartSheet />
          </div>
        ) : (
          <div>
            <Link to={'/login'}><Button variant='outline' className='hidden md:flex'>Login<LogIn /></Button></Link>
          </div>
        )}
        <MenuMobile />
      </div>
    </header>
  )
}
