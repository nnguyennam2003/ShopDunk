import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { CreditCard, ShoppingBag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '@/store/slices/cartSlice'
import { formatVND } from '@/helpers/FormatDataNumber'

export default function CartSheet() {
    const { carts } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const handleRemoveFromCart = (idCartItem) => {
        if (idCartItem) dispatch(removeFromCart(idCartItem))
    }

    const handleCheckout = () => {
        setOpen(false)
        setTimeout(() => navigate('/checkout'), 200)
    }


    const total = (Array.isArray(carts) ? carts : []).reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
        0
    );

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="hidden md:flex"><Button variant='outline'><ShoppingBag />{Array.isArray(carts) ? carts.length : 0}</Button></SheetTrigger>
            <SheetContent className="!w-[40%] !max-w-full">
                <SheetTitle className='p-3'>ShopDunk | Giỏ hàng</SheetTitle>

                {
                    carts.length > 0 ? (
                        <SheetHeader className='py-0'>
                            <ul className='auto-scroll max-h-[70vh] overflow-y-auto mt-4'>
                                {(Array.isArray(carts) ? carts : []).map((item, index) => (
                                    <li key={index} className="flex items-center justify-between gap-1 my-3 pb-3 border-b border-gray-200 last:border-0 ">
                                        <div className='mr-2'>
                                            <Button variant='outline' size='sm' className='w-7 h-7' onClick={() => handleRemoveFromCart(item.id)}>
                                                <X className="size-4" />
                                            </Button>
                                        </div>
                                        <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded mr-2" />
                                        <div className="flex flex-col flex-1">
                                            <span className="font-semibold">{item.name}</span>
                                            <span className="text-sm text-gray-500">Màu: {item.color}</span> 
                                            <span className="text-sm text-gray-500">Dung lượng: {item.storage}GB</span>
                                        </div>
                                        <div className='pr-4'>
                                            <p className="text-[16px]"><span className="text-sm mr-[2px]">₫</span>{formatVND(item.price)}</p>
                                            <p>Số lượng: {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </SheetHeader>
                    ) : (
                        <div className='flex items-center justify-center h-full'>
                            <p className='text-gray-500'>Không có phẩm nào trong giỏ hàng</p>
                        </div>
                    )
                }

                {
                    carts.length > 0 ? (
                        <SheetFooter >
                            <div>
                                <p className="text-lg font-semibold">Tổng: <span className="mr-[2px]">₫</span>{formatVND(total)} </p>
                                <p className="text-sm text-gray-500">Chi tiết thuế và phí vận chuyển ở bước thanh toán</p>
                            </div>
                            <div className='flex justify-end'>
                                <Button variant={'outline'} onClick={handleCheckout} className='w-fit'>Thanh toán<CreditCard /></Button>
                            </div>
                        </SheetFooter>
                    ) : null
                }
            </SheetContent>
        </Sheet>
    )
}
