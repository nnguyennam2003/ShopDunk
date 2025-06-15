import { formatDateTimeVN, formatVND } from '@/helpers/FormatDataNumber';
import { joinStringAddress } from '@/helpers/FormatDataString';
import { enumPaymentMethodSwitch } from '@/helpers/SwitchDataEnum';
import instance from '@/lib/axios';
import { ChevronLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function OrderDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [orderDetail, setOrderDetail] = useState(null)
    
    const getOrderDetail = async () => {
        try {
            const res = await instance.get(`/checkout/${id}`)
            setOrderDetail(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getOrderDetail()
    }, [id])

    useEffect(() => {
        document.title = `Chi tiết đơn hàng #${id}`
    }, [id])
    
    return (
        <div>
            <h1 className='text-center text-2xl font-bold mt-10'>Chi tiết đơn hàng #{orderDetail?.order?.id}</h1>
            <p className='text-center text-gray-500 mt-1'>Đặt vào lúc {formatDateTimeVN(orderDetail?.order?.created_at)}</p>

            <div className='flex gap-10 mt-10'>
                <ul className='flex-1 flex flex-col'>
                    <li className='flex justify-between border-b-1 border-gray-300 py-6'>
                        <p>Tổng tiền:</p>
                        <p>{formatVND(orderDetail?.order?.total_price)}₫</p>
                    </li>
                    <li className='flex justify-between border-b-1 border-gray-300 py-6'>
                        <p>Hình thức thanh toán:</p>
                        <p>{enumPaymentMethodSwitch(orderDetail?.payment?.method)}</p>
                    </li>
                    <li className='flex justify-between border-b-1 border-gray-300 py-6'>
                        <p>Địa chỉ giao hàng:</p>
                        <p className='text-right w-[60%]'>{joinStringAddress(orderDetail?.address)}</p>
                    </li>
                    <li className='flex justify-between border-b-1 border-gray-300 py-6'>
                        <p>Tình trạng đơn hàng:</p>
                        <p>{orderDetail?.order?.status}</p>
                    </li>
                    <li className='flex justify-between border-b-1 border-gray-300 py-6'>
                        <p>Trạng thái thanh toán:</p>
                        <p>{orderDetail?.payment?.status}</p>
                    </li>
                    <li className='mt-10 flex hover:cursor-pointer hover:underline hover:text-blue-700' onClick={() => navigate('/orders')}>
                        <ChevronLeft /><p>Quay lại</p>
                    </li>
                </ul>
                <ul className='w-[35%] flex flex-col gap-4'>
                    {
                        orderDetail?.items.map((item, index) => (
                            <li key={index} className='flex gap-3 border-1 border-gray-200 p-4 rounded-2xl shadow-md'>
                                <div className='w-22 min-w-22'>
                                    <img src={item.image_url} alt={item.name} />
                                </div>
                                <div className='flex-1 flex flex-col justify-center'>
                                    <h3 className='text-xl mb-1'>{item.name}</h3>
                                    <p className='text-sm text-gray-500'>{item.color}</p>
                                    <p className='text-sm text-gray-500'>{item.storage}GB</p>
                                </div>
                                <div className='flex flex-col justify-between'>
                                    <p>{formatVND(item.price)}₫</p>
                                    <p className='text-right'>x{item.quantity}</p>
                                </div>
                            </li>
                        ))
                    }
                    
                </ul>
            </div>
        </div>
    )
}
