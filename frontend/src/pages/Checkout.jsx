import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getListCart } from '@/store/slices/cartSlice'
import { getListAddress } from '@/store/slices/addressSlice'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner'
import { PencilLine } from 'lucide-react'

import { formatVND } from '@/helpers/FormatDataNumber'
import { joinStringAddress } from '@/helpers/FormatDataString'

import { getAddressDefault } from '@/services/address'
import { checkoutOrder } from '@/services/checkout'

export default function Checkout() {
  useEffect(() => {
    document.title = "Thanh toán"
  }, [])

  const { carts } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('')
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [showNoAddressDialog, setShowNoAddressDialog] = useState(false);

  const { addresses } = useSelector(state => state.address)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAddressDefault = async () => {
      const res = await getAddressDefault()
      setDefaultAddress(res.data)
    }

    fetchAddressDefault()
  }, [])

  useEffect(() => {
    if (!Array.isArray(carts) || carts.length === 0) {
      navigate('/', { replace: true })
    }
  }, [carts, navigate])

  const total = (Array.isArray(carts) ? carts : []).reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
    0
  )

  const handleOpenAddressDialog = async () => {
    setOpenAddressDialog(true);
    try {
      dispatch(getListAddress())
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectAddress = (address) => {
    setDefaultAddress(address);
    setOpenAddressDialog(false);
  }

  const handleConfirmAddAddress = () => {
    setShowNoAddressDialog(false);
    navigate('/profile'); // Điều hướng đến trang profile để thêm địa chỉ
  };


  const handleCheckout = async () => {
    if (!defaultAddress) return;
    const checkoutData = {
      address_id: defaultAddress.id,
      items: carts.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        color: item.color,
        storage: item.storage,
        price: item.price
      })),
      payment_method: paymentMethod
    }
    try {
      await checkoutOrder(checkoutData)
      dispatch(getListCart());
      navigate('/checkout-success', { state: { success: true } })
    } catch (err) {
      console.error(err)
      toast.error('Đặt hàng thất bại!')
    }
  }

  return (
    <div>
      <h1 className='font-semibold text-4xl mb-4 mt-8 text-center'>Tổng giá trị hóa đơn của bạn là {formatVND(total)}₫</h1>
      <p className='text-gray-800 text-center text-xl'>Vận chuyển miễn phí đối với mọi đơn hàng.</p>

      <ul className='w-full mt-10'>
        {
          carts.map((cart, index) => {
            return (
              <li className='flex gap-10 py-6 px-14 items-center border-t-2 border-gray-200' key={index}>
                <div className='w-60'>
                  <img src={cart.image_url} alt={cart.name} className="w-52 h-52 object-cover rounded mr-2" />
                </div>
                <div className='flex justify-between w-full'>
                  <div>
                    <h2 className='font-semibold text-2xl'>{cart.name}</h2>
                    <p className='text-gray-800 text-xl'>Màu: {cart.color}</p>
                    <p className='text-gray-800 text-xl'>Dung lượng: {cart.storage}GB</p>
                  </div>
                  <div>
                    <p className='text-black font-semibold text-xl'>{formatVND(cart.price)}đ</p>
                    <p className='text-gray-800 text-xl'>Số lượng: {cart.quantity}</p>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>

      <Dialog open={openAddressDialog} onOpenChange={setOpenAddressDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chọn địa chỉ giao hàng</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            <Button variant="outline" className="mb-3" onClick={() => {
              setOpenAddressDialog(false);      // Đóng dialog chọn địa chỉ
              setShowNoAddressDialog(true);     // Mở dialog xác nhận
            }}>Thêm địa chỉ mới</Button>
            {addresses.length === 0 && (
              <div className="text-gray-500">Không có địa chỉ nào</div>
            )}
            {addresses.map(addr => (
              <div
                key={addr.id}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${defaultAddress?.id === addr.id ? "border-blue-500" : ""}`}
                onClick={() => handleSelectAddress(addr)}
              >
                <div className="text-gray-700">{joinStringAddress(addr)}</div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showNoAddressDialog} onOpenChange={setShowNoAddressDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn muốn thêm địa chỉ giao hàng mới?</DialogTitle>
          </DialogHeader>
          <div className="text-gray-700 mb-4">
            Vui lòng vào mục địa chỉ trong trang hồ sơ của bạn để thêm mới.
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowNoAddressDialog(false)}>Đóng</Button>
            <Button onClick={handleConfirmAddAddress}>Thêm địa chỉ</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className='mt-4 border-t-2 border-gray-200'>
        <h2 className='mt-10 font-semibold text-2xl'>Thông tin giao hàng</h2>
        <div className='flex gap-6 mt-7'>
          <ul className='flex-1 flex flex-col gap-3 border-r-2 border-gray-200 pr-8'>
            <li className='flex justify-between text-gray-800 text-xl border-b-2 border-gray-200 pb-4'>
              <p>Họ tên:</p>
              <p>{user.fullName}</p>
            </li>
            <li className='flex justify-between text-gray-800 text-xl border-b-2 border-gray-200 pb-4'>
              <p>Số điện thoại:</p>
              <p>{user.phone}</p>
            </li>
            <li>
              <div className='flex gap-4 items-center text-gray-800 text-xl'>
                <p>Địa chỉ giao hàng</p>
                <Button variant='outline' onClick={handleOpenAddressDialog}>Thay đổi <PencilLine /></Button>
              </div>
              <p className='text-gray-500 text-xl mt-2'>
                {joinStringAddress(defaultAddress)}
              </p>
            </li>
          </ul>

          <ul className='w-[40%] flex flex-col gap-3'>
            <li className='flex justify-between text-gray-800 text-xl border-b-2 border-gray-200 pb-4'>
              <p>Vận chuyển:</p>
              <p>Miễn phí</p>
            </li>
            <li className='flex justify-between text-gray-800 text-xl border-b-2 border-gray-200 pb-4'>
              <p>Tổng giá trị hóa đơn:</p>
              <p>{formatVND(total)}₫</p>
            </li>
            <li className='text-xl'>
              <label>Phương thức thanh toán</label>
              <div className='mt-2'>
                <input
                  type="radio"
                  name="payment"
                  id="payment-cash"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className='mr-2'
                />
                <label htmlFor="payment-cash">Thanh toán khi nhận hàng</label>
              </div>
              <div className='mt-2'>
                <input
                  type="radio"
                  name="payment"
                  id="payment-zalopay"
                  value="zalopay"
                  checked={paymentMethod === 'zalopay'}
                  onChange={() => setPaymentMethod('zalopay')}
                  className='mr-2'
                />
                <label htmlFor="payment">Thanh toán Zalopay</label>
              </div>
            </li>
            <li>
              <Button className='w-full mt-6 p-6 text-xl cursor-pointer' disabled={!defaultAddress || !paymentMethod} onClick={handleCheckout}>Thanh toán</Button>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}
