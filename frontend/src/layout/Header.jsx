import Navbar from '@/components/navbar'
import React from 'react'
import appleLogo from '@/assets/images/Apple_logo_black.svg'
import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MenuMobile from '@/components/menu-mobile'
import { useNavigate } from 'react-router-dom'
import CartSheet from '@/components/cart-sheet'
import MenuProfile from '@/components/menu-profile'
import { useSelector } from 'react-redux'

export default function Header() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  return (
    <header className='bg-white w-full'>
      <div className='w-full sm:max-w-[85%] px-6 md:px-0 sm:px-0 mx-auto py-2 flex items-center justify-between'>
        <div className='w-5 sm:w-6 mr-16' onClick={() => navigate('/')}>
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
              <Button variant='outline' className='hidden md:flex' onClick={() => navigate('/login')}>Đăng nhập<LogIn /></Button>
          </div>
        )}
        <MenuMobile />
      </div>
    </header>
  )
}
