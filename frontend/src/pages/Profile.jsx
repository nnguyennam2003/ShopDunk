import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux'
import { formatDateToDMY } from '@/helpers/FormatDataNumber'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { logout } from '@/store/slices/authSlice'
import RightProfile from '@/components/common/Profile/RightProfile'
import { enumGenderSwitch } from '@/helpers/SwitchDataEnum'

export default function Profile() {
  console.log('render profile')
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <div className='flex mt-5 pb-10 min-h-[80vh]'>
      <div className='flex-1 border-r-1 border-gray-300 pr-10'>
        <h1 className='font-bold text-3xl'>Hồ sơ</h1>
        <div className='w-full flex justify-center'>
          <Avatar className='md:w-44 md:h-44 w-32 h-32 mt-7'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-col gap-2 mt-5'>
          <h2 className='text-2xl font-semibold text-center'>{user.fullName}</h2>
          <p className='text-gray-500'>Email: {user.email}</p>
          <p className='text-gray-500'>Giới tính: {enumGenderSwitch(user.gender)}</p>
          <p className='text-gray-500'>Số điện thoại: {user.phone}</p>
          <p className='text-gray-500'>Ngày sinh: {formatDateToDMY(user.birthday)}</p>
        </div>
        {
          user && user.role === 'admin' && (
            <Button className='mt-5 w-full' variant='outline' onClick={() => navigate('/admin')}>
              Admin Dashboard
            </Button>
          )}

        <Button className='mt-2 w-full' variant='outline' onClick={() => navigate('/orders')}>
          Đơn hàng của tôi
        </Button>
        <Button className='mt-2 w-full' variant='outline' onClick={handleLogout}>
          Đăng xuất <LogOut />
        </Button>
      </div>

      <div className='flex-3 pl-10'>
        <RightProfile />
      </div>
    </div>
  )
}
